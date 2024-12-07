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

def buscar_productos(filtros):
    query = db.query(Producto)

    if 'nombre_producto' in filtros:
        query = query.filter(Producto.nombre_producto.ilike(f"%{filtros['nombre_producto']}%"))
    if 'tipo' in filtros:
        query = query.filter(Producto.descripcion.ilike(f"%{filtros['tipo']}%"))
    if 'marca' in filtros:
        query = query.filter(Producto.descripcion.ilike(f"%{filtros['marca']}%"))
    if 'precio' in filtros:
        precio_filtro = filtros['precio']
        if 'min' in precio_filtro:
            query = query.filter(Producto.precio >= precio_filtro['min'])
        if 'max' in precio_filtro:
            query = query.filter(Producto.precio <= precio_filtro['max'])

    return query.all()
