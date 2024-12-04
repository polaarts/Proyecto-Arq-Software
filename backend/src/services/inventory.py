#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import service
from src.services.db import producto_methods as db

def run_inventario_service(s: service.Service):
    s.sinit()
    print("Service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']

        if action == 'consultar_producto':
            producto_id = request.content['body']['producto_id']
            producto = db.consultar_stock(producto_id)
            response = service.Response(s.name, {'producto': producto})

        elif action == 'actualizar_stock':
            producto_id = request.content['producto_id']
            cantidad = request.content['cantidad']
            db.actualizar_stock(producto_id, cantidad)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'crear_producto':
            nuevo_producto = {
                'id_producto': request.content['id_producto'],
                'nombre_producto': request.content['nombre_producto'],
                'descripcion': request.content['descripcion'],
                'precio': request.content['precio'],
                'cantidad': request.content['cantidad'],
                'id_proveedor': request.content['id_proveedor'],
            }
            db.crear_producto(nuevo_producto)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'listar_productos':
            productos = db.listar_productos()
            response = service.Response(s.name, {'productos': productos})

        elif action == 'buscar_producto_filtros':
            filtros = request.content['filtros']
            productos = db.buscar_productos(filtros)
            response = service.Response(s.name, {'productos': productos})

        # Ejemplo de servicio llamando a otro servicio
        elif action == 'productos_por_categoria':
            categoria_id = request.content['id_categoria']
            service_request = client.Request('categ', {'action': 'listar_productos_de_categoria', 'body': {'id_categoria': categoria_id}})
            c.send(service_request)
            response = c.receive()

            if response:
                productos = response.content['productos']
                response = service.Response(s.name, {'productos': productos})
            else:
                response = service.Response(s.name, {'error': 'No products found or service error'})


        else:
            response = service.Response(s.name, {'status': 'failure'})

        s.send(response)
        # s.close()

if __name__ == '__main__':
    s = service.Service('inven')
    run_inventario_service(s)
