#!/usr/bin/env python3

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

Base = declarative_base()

class Producto(Base):
    __tablename__ = 'productos'
    id_producto = Column(Integer, primary_key=True, autoincrement=True)
    nombre_producto = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    precio = Column(Float, nullable=False)
    cantidad = Column(Integer, nullable=False)
    id_proveedor = Column(Integer)
    id_sucursal = Column(Integer)

engine = create_engine('sqlite:///inventario.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

def consultar_stock(producto_id):
    producto = session.query(Producto).filter_by(id_producto=producto_id).first()
    return producto if producto else 0

def actualizar_stock(producto_id, cantidad):
    producto = session.query(Producto).filter_by(id_producto=producto_id).first()
    if producto:
        producto.cantidad += cantidad
        session.commit()

def crear_producto(producto):
    nuevo_producto = Producto(
        id_producto=producto['id_producto'],
        nombre_producto=producto['nombre_producto'],
        descripcion=producto['descripcion'],
        precio=producto['precio'],
        cantidad=producto['cantidad'],
        id_proveedor=producto['id_proveedor'],
        id_sucursal=producto['id_sucursal']
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
            'id_sucursal': p.id_sucursal
        } for p in productos
    ]
