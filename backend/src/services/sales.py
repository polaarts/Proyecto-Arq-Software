#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import service
from src.bus import client
from src.services.db import sales_methods as db
from src.services.db import producto_methods as producto_db

def run_ventas_service(s: service.Service):
    s.sinit()
    print("Sales service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']
        body = request.content['body']

        if action == 'registrar_venta':
            productos = body['productos']
            total = 0
            detalles_venta = []

            for item in productos:
                producto_id = item['id_producto']
                cantidad = item['cantidad']

                producto = producto_db.consultar_por_id(producto_id)
                if not producto:
                    response = service.Response(s.name, {
                        'status': 'failure',
                        'error': f'Product with ID {producto_id} not found.'
                    })
                    break

                if producto['cantidad'] < cantidad:
                    response = service.Response(s.name, {
                        'status': 'failure',
                        'error': f'Insufficient stock for product ID {producto_id}.'
                    })
                    break

                total += producto['precio'] * cantidad
                producto_db.actualizar_stock(producto_id, -cantidad)

                detalles_venta.append({
                    'id_producto': producto_id,
                    'cantidad': cantidad,
                    'precio_unitario': producto['precio'],
                    'subtotal': producto['precio'] * cantidad
                })

            else:
                venta_id = db.registrar_venta({
                    'productos': detalles_venta,
                    'total': total
                })

                response = service.Response(s.name, {
                    'status': 'success',
                    'venta_id': venta_id,
                    'total': total
                })
        elif action == 'listar_ventas':
            ventas = db.listar_ventas()
            response = service.Response(s.name, {'ventas': ventas})

        else:
            response = service.Response(s.name, {'status': 'failure', 'error': 'Invalid action'})

        s.send(response)

if __name__ == '__main__':
    s = service.Service('sales')
    run_ventas_service(s)
