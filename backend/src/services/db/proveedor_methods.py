#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.services.db.db_session import session
from src.services.db.models import Proveedor

def registrar_proveedor(proveedor_data):
    nuevo_proveedor = Proveedor(
        nombre=proveedor_data['nombre'],
        contacto=proveedor_data['contacto'],
        telefono=proveedor_data['telefono'],
        email=proveedor_data['email'],
        direccion=proveedor_data['direccion']
    )
    session.add(nuevo_proveedor)
    session.commit()
    return nuevo_proveedor.id_proveedor

def listar_proveedores():
    proveedores = session.query(Proveedor).all()
    proveedores_formateados = [
        {
            'id_proveedor': proveedor.id_proveedor,
            'nombre': proveedor.nombre,
            'contacto': proveedor.contacto,
            'telefono': proveedor.telefono,
            'email': proveedor.email,
            'direccion': proveedor.direccion
        } for proveedor in proveedores
    ]
    return proveedores_formateados

def eliminar_proveedor(proveedor_id):
    proveedor = session.query(Proveedor).filter_by(id_proveedor=proveedor_id).first()
    if proveedor:
        session.delete(proveedor)
        session.commit()
        return True
    return False

def actualizar_proveedor(proveedor_id, datos_actualizados):
    proveedor = session.query(Proveedor).filter_by(id_proveedor=proveedor_id).first()
    if proveedor:
        for key, value in datos_actualizados.items():
            setattr(proveedor, key, value)
        session.commit()
        return True
    return False

def consultar_proveedor_por_id(proveedor_id):
    proveedor = session.query(Proveedor).filter_by(id_proveedor=proveedor_id).first()
    if proveedor:
        return {
            'id_proveedor': proveedor.id_proveedor,
            'nombre': proveedor.nombre,
            'contacto': proveedor.contacto,
            'telefono': proveedor.telefono,
            'email': proveedor.email,
            'direccion': proveedor.direccion
        }
    return None
