from fastapi import FastAPI, HTTPException, Request
import sys
import os
from pydantic import BaseModel

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.bus import client
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InventarioRequest(BaseModel):
    cantidad: int = None
    id_producto: int = None
    nombre_producto: str = None
    descripcion: str = None
    precio: float = None
    id_proveedor: int = None

@app.post("/inventario/producto")
async def create_product(request: InventarioRequest):
    c = client.Client()

    request_body = {
        "cantidad": request.cantidad,
        "id_producto": request.id_producto,
        "nombre_producto": request.nombre_producto,
        "descripcion": request.descripcion,
        "precio": request.precio,
        "id_proveedor": request.id_proveedor,
    }
    service_request = client.Request('inven', {'action': 'crear_producto', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.delete("/inventario/producto/{producto_id}")
async def delete_product(producto_id: str):
    c = client.Client()

    request_body = {
        "producto_id": producto_id
    }
    service_request = client.Request('inven', {'action': "eliminar_producto", 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.get("/inventario/producto/buscar")
async def get_product_by_id(request: InventarioRequest):
    c = client.Client()

    request_body = {
        "nombre_producto": request.nombre_producto
    }
    service_request = client.Request('inven', {'action': "buscar_producto_filtros", 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.put("/inventario/producto/{producto_id}")
async def update_product_stock(producto_id: str, request: InventarioRequest):
    c = client.Client()

    request_body = {
        "producto_id": producto_id,
        "cantidad": request.cantidad
    }
    service_request = client.Request('inven', {'action': "actualizar_stock", 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content


@app.get("/inventario/producto/{producto_id}")
async def get_product_by_id(producto_id: str):
    c = client.Client()

    request_body = {
        "producto_id": producto_id
    }
    service_request = client.Request('inven', {'action': "consultar_producto", 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.get("/inventario/productos")
async def list_all_products():
    c = client.Client()

    service_request = client.Request('inven', {'action': "listar_productos", 'body': {}})

    c.send(service_request)
    response = c.receive()

    if not response.content.get('productos'):
        raise HTTPException(status_code=404, detail="No products found")

    return response.content

@app.get("/inventario/productos/bajo_stock")
async def list_low_stock():
    c = client.Client()

    service_request = client.Request('inven', {'action': "listar_bajo_stock", 'body': {}})

    c.send(service_request)
    response = c.receive()

    return response.content

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
