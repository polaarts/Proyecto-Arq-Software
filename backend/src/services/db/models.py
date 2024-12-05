#!/usr/bin/env python3

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()

class Producto(Base):
    __tablename__ = 'productos'
    nombre_producto = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    precio = Column(Float, nullable=False)
    cantidad = Column(Integer, nullable=False)
    id_producto = Column(Integer, primary_key=True, autoincrement=True)
    id_proveedor = Column(Integer)
    id_categoria = Column(Integer, ForeignKey('categorias.id_categoria'), nullable=True)

    categoria = relationship('Categoria', backref='productos')

class Categoria(Base):
    __tablename__ = 'categorias'
    id_categoria = Column(Integer, primary_key=True, autoincrement=True)
    nombre_categoria = Column(String(100), nullable=False, unique=True)

class Venta(Base):
    __tablename__ = 'ventas'

    id_venta = Column(Integer, primary_key=True, autoincrement=True, index=True)
    total = Column(Integer, nullable=False)

    productos = relationship('Producto', secondary='venta_productos')

class VentaProducto(Base):
    __tablename__ = 'venta_productos'

    id_venta = Column(Integer, ForeignKey('ventas.id_venta'), primary_key=True)
    id_producto = Column(Integer, ForeignKey('productos.id_producto'), primary_key=True)
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Float, nullable=False)
