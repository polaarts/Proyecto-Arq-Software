#!/usr/bin/env python3

import sys
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

# Simulación de base de datos en memoria
proveedores_db = {}

# Inicialización de la app
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PROVEEDORES

class ProveedorRequest(BaseModel):
    nombre: str
    contacto: str
    telefono: str
    email: EmailStr
    direccion: str

class ProveedorResponse(BaseModel):
    id: int
    nombre: str
    contacto: str
    telefono: str
    email: EmailStr
    direccion: str

@app.post("/proveedor", response_model=ProveedorResponse)
async def registrar_proveedor(request: ProveedorRequest):
    """Registrar un nuevo proveedor"""
    proveedor_id = len(proveedores_db) + 1
    nuevo_proveedor = {
        "id": proveedor_id,
        **request.dict()
    }
    proveedores_db[proveedor_id] = nuevo_proveedor
    return nuevo_proveedor

@app.get("/proveedor/{proveedor_id}", response_model=ProveedorResponse)
async def get_proveedor_by_id(proveedor_id: int):
    """Obtener un proveedor por su ID"""
    proveedor = proveedores_db.get(proveedor_id)
    if not proveedor:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return proveedor

@app.get("/proveedores", response_model=List[ProveedorResponse])
async def listar_proveedores():
    """Listar todos los proveedores"""
    return list(proveedores_db.values())

@app.delete("/proveedor/{proveedor_id}", response_model=dict)
async def eliminar_proveedor(proveedor_id: int):
    """Eliminar un proveedor por su ID"""
    if proveedor_id not in proveedores_db:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    del proveedores_db[proveedor_id]
    return {"message": "Proveedor eliminado con éxito"}

@app.post("/proveedor/{proveedor_id}/reabastecimiento", response_model=dict)
async def reabastecimiento(proveedor_id: int):
    """Solicitar reabastecimiento a un proveedor"""
    proveedor = proveedores_db.get(proveedor_id)
    if not proveedor:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return {"message": f"Reabastecimiento solicitado al proveedor {proveedor['nombre']}"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)


# SALES

# Simulación de base de datos en memoria
ventas_db = {}

class Producto(BaseModel):
    id_producto: int
    cantidad: int

class VentaRequest(BaseModel):
    productos: List[Producto]

class VentaResponse(BaseModel):
    id: int
    productos: List[Producto]

@app.post("/ventas", response_model=VentaResponse)
async def register_sale(request: VentaRequest):
    """Registrar una nueva venta"""
    venta_id = len(ventas_db) + 1
    nueva_venta = {
        "id": venta_id,
        "productos": [p.dict() for p in request.productos]
    }
    ventas_db[venta_id] = nueva_venta
    return nueva_venta

@app.get("/ventas/{venta_id}", response_model=VentaResponse)
async def get_sale_by_id(venta_id: int):
    """Obtener una venta por su ID"""
    venta = ventas_db.get(venta_id)
    if not venta:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    return venta

@app.get("/ventas", response_model=List[VentaResponse])
async def list_all_sales():
    """Listar todas las ventas"""
    return list(ventas_db.values())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)


# INVENTORY

# Simulación de base de datos en memoria
inventario_db = {}

class InventarioRequest(BaseModel):
    cantidad: Optional[int] = None
    id_producto: Optional[int] = None
    nombre_producto: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    id_proveedor: Optional[int] = None

class ProductoResponse(BaseModel):
    id_producto: int
    cantidad: int
    nombre_producto: str
    descripcion: str
    precio: float
    id_proveedor: int

@app.post("/inventario/producto", response_model=ProductoResponse)
async def create_product(request: InventarioRequest):
    """Crear un nuevo producto en el inventario"""
    if not request.id_producto:
        raise HTTPException(status_code=400, detail="El ID del producto es obligatorio")

    if request.id_producto in inventario_db:
        raise HTTPException(status_code=400, detail="El producto ya existe")

    nuevo_producto = {
        "id_producto": request.id_producto,
        "cantidad": request.cantidad or 0,
        "nombre_producto": request.nombre_producto,
        "descripcion": request.descripcion,
        "precio": request.precio or 0.0,
        "id_proveedor": request.id_proveedor,
    }
    inventario_db[request.id_producto] = nuevo_producto
    return nuevo_producto

@app.delete("/inventario/producto/{producto_id}", response_model=dict)
async def delete_product(producto_id: int):
    """Eliminar un producto del inventario"""
    if producto_id not in inventario_db:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    del inventario_db[producto_id]
    return {"message": "Producto eliminado con éxito"}

@app.get("/inventario/producto/{producto_id}", response_model=ProductoResponse)
async def get_product_by_id(producto_id: int):
    """Obtener un producto por su ID"""
    producto = inventario_db.get(producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@app.put("/inventario/producto/{producto_id}", response_model=ProductoResponse)
async def update_product_stock(producto_id: int, request: InventarioRequest):
    """Actualizar el stock de un producto"""
    producto = inventario_db.get(producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if request.cantidad is not None:
        producto["cantidad"] = request.cantidad

    return producto

@app.get("/inventario/productos", response_model=List[ProductoResponse])
async def list_all_products():
    """Listar todos los productos del inventario"""
    return list(inventario_db.values())

@app.get("/inventario/productos/bajo_stock", response_model=List[ProductoResponse])
async def list_low_stock():
    """Listar productos con bajo stock"""
    return [p for p in inventario_db.values() if p["cantidad"] < 10]

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# CATEGORY

# Simulación de base de datos en memoria
categorias_db = {}
productos_db = {}


class CategoriaRequest(BaseModel):
    id_categoria: Optional[int] = None
    id_producto: Optional[int] = None
    nombre_categoria: Optional[str] = None

class CategoriaResponse(BaseModel):
    id_categoria: int
    nombre_categoria: str
    productos: List[int]

@app.post("/categoria", response_model=CategoriaResponse)
async def crear_categoria(request: CategoriaRequest):
    """Crear una nueva categoría"""
    if not request.nombre_categoria:
        raise HTTPException(status_code=400, detail="El nombre de la categoría es obligatorio")

    id_categoria = len(categorias_db) + 1
    nueva_categoria = {
        "id_categoria": id_categoria,
        "nombre_categoria": request.nombre_categoria,
        "productos": []
    }
    categorias_db[id_categoria] = nueva_categoria
    return nueva_categoria

@app.post("/categoria/agregar_producto", response_model=CategoriaResponse)
async def agregar_producto_a_categoria(request: CategoriaRequest):
    """Agregar un producto a una categoría"""
    if not request.id_categoria or not request.id_producto:
        raise HTTPException(status_code=400, detail="ID de categoría y producto son obligatorios")

    categoria = categorias_db.get(request.id_categoria)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    if request.id_producto not in productos_db:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    if request.id_producto in categoria["productos"]:
        raise HTTPException(status_code=400, detail="El producto ya está en la categoría")

    categoria["productos"].append(request.id_producto)
    return categoria

@app.post("/categoria/quitar_producto", response_model=CategoriaResponse)
async def quitar_producto_de_categoria(request: CategoriaRequest):
    """Quitar un producto de una categoría"""
    if not request.id_categoria or not request.id_producto:
        raise HTTPException(status_code=400, detail="ID de categoría y producto son obligatorios")

    categoria = categorias_db.get(request.id_categoria)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    if request.id_producto not in categoria["productos"]:
        raise HTTPException(status_code=400, detail="El producto no está en la categoría")

    categoria["productos"].remove(request.id_producto)
    return categoria

@app.get("/categoria/{id_categoria}/productos", response_model=List[int])
async def listar_productos_de_categoria(id_categoria: int):
    """Listar productos de una categoría"""
    categoria = categorias_db.get(id_categoria)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    return categoria["productos"]

@app.get("/categorias", response_model=List[CategoriaResponse])
async def listar_categorias():
    """Listar todas las categorías"""
    return list(categorias_db.values())

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)