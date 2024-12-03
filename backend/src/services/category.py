#!/usr/bin/env python3

#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import service
from src.services.db import categoria_methods

def run_categoria_service(s: service.Service):
    s.sinit()
    print("Service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']

        if action == 'crear_categoria':
            nueva_categoria = {
                'id_categoria': request.content['id_categoria'],
                'nombre_categoria': request.content['nombre_categoria'],
                'descripcion': request.content.get('descripcion', ''),
            }
            categoria_methods.crear_categoria(nueva_categoria)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'agregar_producto_a_categoria':
            categoria_id = request.content['id_categoria']
            nuevo_producto = {
                'id_producto': request.content['id_producto'],
                'nombre_producto': request.content['nombre_producto'],
                'descripcion': request.content['descripcion'],
                'precio': request.content['precio'],
                'cantidad': request.content['cantidad'],
                'id_proveedor': request.content['id_proveedor'],
            }
            categoria_methods.agregar_producto_a_categoria(categoria_id, nuevo_producto)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'quitar_producto_de_categoria':
            categoria_id = request.content['id_categoria']
            producto_id = request.content['id_producto']
            categoria_methods.quitar_producto_de_categoria(categoria_id, producto_id)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'listar_productos_de_categoria':
            categoria_id = request.content['id_categoria']
            productos = categoria_methods.listar_productos_de_categoria(categoria_id)
            response = service.Response(s.name, {'productos': productos})

        else:
            response = service.Response(s.name, {'status': 'failure', 'error': 'Invalid action'})

        s.send(response)
        s.close()

if __name__ == '__main__':
    s = service.Service('categ')
    run_categoria_service(s)
