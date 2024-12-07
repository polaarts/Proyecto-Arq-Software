#!/usr/bin/env python3
#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import service
from src.services.db import proveedor_methods as db

def run_proveedores_service(s: service.Service):
    s.sinit()
    print("Proveedores service initialized and waiting for requests...")
    while True:
        request = s.receive()
        action = request.content['action']
        body = request.content['body']

        if action == 'registrar_proveedor':
            nuevo_proveedor = {
                'nombre': body['nombre'],
                'contacto': body['contacto'],
                'telefono': body['telefono'],
                'email': body['email'],
                'direccion': body['direccion']
            }
            db.registrar_proveedor(nuevo_proveedor)
            response = service.Response(s.name, {'status': 'success'})

        elif action == 'listar_proveedores':
            proveedores = db.listar_proveedores()
            response = service.Response(s.name, {'proveedores': proveedores})

        elif action == 'consultar_por_id':
           proveedor = db.consultar_proveedor_por_id(body['id_proveedor'])
           response = service.Response(s.name, {'proveedor': proveedor})

        elif action == 'solicitud_reabastecimiento':
            proveedor_id = body['proveedor_id']
            response = service.Response(s.name, {'status': 'success', 'message': f'Solicitud enviada para reabastecerse al proveedor {proveedor_id}'})

        elif action == 'eliminar_proveedor':
            proveedor_id = body['proveedor_id']
            db.eliminar_proveedor(proveedor_id)
            response = service.Response(s.name, {'status': 'success', 'message': f'Proveedor {proveedor_id} eliminado exitosamente.'})

        else:
            response = service.Response(s.name, {'status': 'failure'})

        s.send(response)

if __name__ == '__main__':
    s = service.Service('prove')
    run_proveedores_service(s)
