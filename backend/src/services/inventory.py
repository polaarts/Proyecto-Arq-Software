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
        body = request.content['body']

        if action == 'consultar_producto':
            producto_id = body['producto_id']
            producto = db.consultar_por_id(producto_id)
            response = service.Response(s.name, {'producto': producto})

        elif action == 'actualizar_stock':
            producto_id = body['producto_id']
            cantidad = body['cantidad']
            db.actualizar_stock(producto_id, cantidad)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'crear_producto':
            nuevo_producto = {
                'nombre_producto': body['nombre_producto'],
                'descripcion': body['descripcion'],
                'precio': body['precio'],
                'cantidad': body['cantidad'],
                'id_proveedor': body['id_proveedor'],
            }
            db.crear_producto(nuevo_producto)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'eliminar_producto':
            producto_id = body['producto_id']
            producto = db.eliminar_producto(producto_id)
            response = service.Response(s.name, {'status': 'success', 'message': f'Producto {producto_id} eliminado exitosamente.'})


        elif action == 'listar_productos':
            productos = db.listar_productos()
            response = service.Response(s.name, {'productos': productos})

        elif action == 'listar_bajo_stock':
            productos = db.listar_bajo_stock()
            response = service.Response(s.name, {'productos': productos})

        elif action == 'buscar_producto_filtros':
            filtros = body['nombre_producto']
            productos = db.buscar_productos(filtros)
            response = service.Response(s.name, {'productos': productos})

        # Ejemplo de servicio llamando a otro servicio
        elif action == 'productos_por_categoria':
            categoria_id = body['id_categoria']
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

if __name__ == '__main__':
    s = service.Service('inven')
    run_inventario_service(s)
