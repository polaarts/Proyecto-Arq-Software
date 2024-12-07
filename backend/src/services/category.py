#!/usr/bin/env python3

#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import service
from src.services.db import categoria_methods as db

def run_categoria_service(s: service.Service):
    s.sinit()
    print("Service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']
        body = request.content['body']

        if action == 'crear_categoria':
            nueva_categoria = {
                'nombre_categoria': body['nombre_categoria'],
            }
            db.crear_categoria(nueva_categoria)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'agregar_producto_a_categoria':
            categoria_id = body['id_categoria']
            producto_id = body['id_producto']
            db.agregar_producto_a_categoria(categoria_id, producto_id)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'quitar_producto_de_categoria':
            categoria_id = body['id_categoria']
            producto_id = body['id_producto']
            db.quitar_producto_de_categoria(categoria_id, producto_id)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'listar_productos_de_categoria':
            categoria_id = body['id_categoria']
            productos = db.listar_productos_de_categoria(categoria_id)
            response = service.Response(s.name, {'productos': productos})

        elif action == 'listar_categorias':
            categorias = db.listar_categorias()
            response = service.Response(s.name, {'categorias': categorias})

        else:
            response = service.Response(s.name, {'status': 'failure', 'error': 'Invalid action'})

        s.send(response)

if __name__ == '__main__':
    s = service.Service('categ')
    run_categoria_service(s)
