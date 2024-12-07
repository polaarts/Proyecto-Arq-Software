#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.services.db.db_session import session
from src.services.db.models import Producto


def consultar_por_id(producto_id):
    p = session.query(Producto).filter_by(id_producto=producto_id).first()
    return {
        'id_producto': p.id_producto,
        'nombre_producto': p.nombre_producto,
        'descripcion': p.descripcion,
        'precio': p.precio,
        'cantidad': p.cantidad,
        'id_proveedor': p.id_proveedor,
    } if p else 0

def actualizar_stock(producto_id, cantidad):
    producto = session.query(Producto).filter_by(id_producto=producto_id).first()
    if producto:
        producto.cantidad += cantidad
        session.commit()

def crear_producto(producto):
    nuevo_producto = Producto(
        nombre_producto=producto['nombre_producto'],
        descripcion=producto['descripcion'],
        precio=producto['precio'],
        cantidad=producto['cantidad'],
        id_proveedor=producto['id_proveedor'],
    )
    session.add(nuevo_producto)
    session.commit()

def listar_productos():
    productos = session.query(Producto).all()
    return [
        {
            'id_producto': p.id_producto,
            'nombre_producto': p.nombre_producto,
            'descripcion': p.descripcion,
            'precio': p.precio,
            'cantidad': p.cantidad,
            'id_proveedor': p.id_proveedor,
        } for p in productos
    ]

def eliminar_producto(producto_id):
    producto = session.query(Producto).filter_by(id_producto=producto_id).first()
    if producto:
        session.delete(producto)
        session.commit()
        return True
    return False

def listar_bajo_stock():
    query = session.query(Producto)

    query = query.filter(Producto.cantidad <= 10)

    productos = query.all()
    return [
        {
            'id_producto': p.id_producto,
            'nombre_producto': p.nombre_producto,
            'descripcion': p.descripcion,
            'precio': p.precio,
            'cantidad': p.cantidad,
            'id_proveedor': p.id_proveedor,
        } for p in productos
    ]

def buscar_productos(filtros):
    query = session.query(Producto)

    query = query.filter(Producto.nombre_producto.ilike(f"%{filtros}%"))

    productos = query.all()
    return [
        {
            'id_producto': p.id_producto,
            'nombre_producto': p.nombre_producto,
            'descripcion': p.descripcion,
            'precio': p.precio,
            'cantidad': p.cantidad,
            'id_proveedor': p.id_proveedor,
        } for p in productos
    ]
