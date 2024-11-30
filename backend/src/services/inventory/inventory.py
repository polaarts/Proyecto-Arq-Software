import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from src.bus import service
from src.services.inventory import db

def run_inventario_service(s: service.Service):
    s.sinit()
    print("Service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']

        if action == 'consultar_producto':
            producto_id = request.content['producto_id']
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
                'id_sucursal': request.content['id_sucursal']
            }
            db.crear_producto(nuevo_producto)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'listar_productos':
            productos = db.listar_productos()
            response = service.Response(s.name, {'productos': productos})

        else:
            response = service.Response(s.name, {'status': 'failure'})

        s.send(response)
    s.close()

if __name__ == '__main__':
    s = service.Service('inven')
    run_inventario_service(s)
