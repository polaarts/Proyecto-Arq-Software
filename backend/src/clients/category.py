#!/usr/bin/env python3

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import client

app = FastAPI()

class CategoriaRequest(BaseModel):
    id_categoria: int = None
    id_producto: int = None
    nombre_categoria: str = None

@app.post("/categoria")
async def crear_categoria(request: CategoriaRequest):
    c = client.Client()

    request_body = {
        "nombre_categoria": request.nombre_categoria,
    }
    service_request = client.Request('categ', {'action': 'crear_categoria', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if response.content.get('status') != 'success':
        raise HTTPException(status_code=500, detail="Failed to create category")

    return response.content

@app.post("/categoria/agregar_producto")
async def agregar_producto_a_categoria(request: CategoriaRequest):
    c = client.Client()

    request_body = {
        "id_categoria": request.id_categoria,
        "id_producto": request.id_producto,
    }
    service_request = client.Request('categ', {'action': 'agregar_producto_a_categoria', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if response.content.get('status') != 'success':
        raise HTTPException(status_code=500, detail="Failed to add product to category")

    return response.content

@app.post("/categoria/quitar_producto")
async def quitar_producto_de_categoria(request: CategoriaRequest):
    c = client.Client()

    request_body = {
        "id_categoria": request.id_categoria,
        "id_producto": request.id_producto,
    }
    service_request = client.Request('categ', {'action': 'quitar_producto_de_categoria', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if response.content.get('status') != 'success':
        raise HTTPException(status_code=500, detail="Failed to remove product from category")

    return response.content

@app.get("/categoria/{id_categoria}/productos")
async def listar_productos_de_categoria(id_categoria: int):
    c = client.Client()

    request_body = {
        "id_categoria": id_categoria,
    }
    service_request = client.Request('categ', {'action': 'listar_productos_de_categoria', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if not response.content.get('productos'):
        raise HTTPException(status_code=404, detail="No products found in category")

    return response.content

@app.get("/categorias")
async def listar_categorias():
    c = client.Client()

    service_request = client.Request('categ', {'action': 'listar_categorias', 'body': {}})

    c.send(service_request)
    response = c.receive()

    if not response.content.get('categorias'):
        raise HTTPException(status_code=404, detail="No categories found.")

    return response.content

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
