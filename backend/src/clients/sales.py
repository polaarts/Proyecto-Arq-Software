#!/usr/bin/env python3

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List

import sys
import os

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

class Producto(BaseModel):
    id_producto: int
    cantidad: int

class VentaRequest(BaseModel):
    productos: List[Producto]

@app.post("/ventas")
async def register_sale(request: VentaRequest):
    c = client.Client()

    request_body = {
        "productos": [{"id_producto": p.id_producto, "cantidad": p.cantidad} for p in request.productos]
    }
    service_request = client.Request('sales', {'action': 'registrar_venta', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if response.content.get('status') == 'failure':
        raise HTTPException(status_code=400, detail=response.content.get('error'))

    return response.content

@app.get("/ventas/{venta_id}")
async def get_sale_by_id(venta_id: str):
    c = client.Client()

    request_body = {
        "venta_id": venta_id
    }
    service_request = client.Request('sales', {'action': 'consultar_venta_por_id', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    if not response.content:
        raise HTTPException(status_code=404, detail="Sale not found")

    return response.content

@app.get("/ventas")
async def list_all_sales():
    c = client.Client()

    service_request = client.Request('sales', {'action': 'listar_ventas', 'body': {}})

    c.send(service_request)
    response = c.receive()

    if not response.content.get('ventas'):
        raise HTTPException(status_code=404, detail="No sales found")

    return response.content

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
