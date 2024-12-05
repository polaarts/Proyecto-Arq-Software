#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.services.db.db_session import session
from src.services.db.models import Venta, VentaProducto

def registrar_venta(venta_data):
    nueva_venta = Venta(
        total=venta_data['total'],
    )
    session.add(nueva_venta)
    session.commit()

    for producto in venta_data['productos']:
        venta_producto = VentaProducto(
            id_venta=nueva_venta.id_venta,
            id_producto=producto['id_producto'],
            cantidad=producto['cantidad'],
            precio_unitario=producto['precio_unitario']
        )
        session.add(venta_producto)

    session.commit()
    return nueva_venta.id_venta

def consultar_venta_por_id(venta_id):
    venta = session.query(Venta).filter_by(id_venta=venta_id).first()
    if venta:
        productos = session.query(VentaProducto).filter_by(id_venta=venta_id).all()
        return {
            'id_venta': venta.id_venta,
            'total': venta.total,
            'productos': [
                {
                    'id_producto': p.id_producto,
                    'cantidad': p.cantidad,
                    'precio_unitario': p.precio_unitario
                } for p in productos
            ]
        }
    return None

def listar_ventas():
    ventas = session.query(Venta).all()
    return [
        {
            'id_venta': venta.id_venta,
            'total': venta.total,
        } for venta in ventas
    ]
