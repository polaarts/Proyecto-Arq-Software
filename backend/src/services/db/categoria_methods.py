#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.services.db.db_session import session
from src.services.db.models import Categoria, Producto

def crear_categoria(categoria):
    nueva_categoria = Categoria(
        nombre_categoria=categoria['nombre_categoria'],
    )
    session.add(nueva_categoria)
    session.commit()

def agregar_producto_a_categoria(categoria_id, producto_id):
    categoria = session.query(Categoria).filter_by(id_categoria=categoria_id).first()
    producto = session.query(Producto).filter_by(id_producto=producto_id).first()

    if categoria and producto:
        producto.id_categoria = categoria_id
        session.commit()

def quitar_producto_de_categoria(categoria_id, producto_id):
    producto = session.query(Producto).filter_by(id_producto=producto_id, id_categoria=categoria_id).first()
    if producto:
        session.delete(producto)
        session.commit()

def listar_productos_de_categoria(categoria_id):
    productos = session.query(Producto).filter_by(id_categoria=categoria_id).all()
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

def listar_categorias():
    categorias = session.query(Categoria).all()
    return [
        {
            'id_categoria': c.id_categoria,
            'nombre_categoria': c.nombre_categoria,
        } for c in categorias
    ]
