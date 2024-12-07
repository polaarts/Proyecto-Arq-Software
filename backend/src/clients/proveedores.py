#!/usr/bin/env python3
#
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.bus import client

app = FastAPI()

class ProveedorRequest(BaseModel):
    nombre: str
    contacto: str
    telefono: str
    email: str
    direccion: str

@app.post("/proveedor")
async def registrar_proveedor(request: ProveedorRequest):
    c = client.Client()
    request_body = {
        "nombre": request.nombre,
        "contacto": request.contacto,
        "telefono": request.telefono,
        "email": request.email,
        "direccion": request.direccion,
    }
    service_request = client.Request('prove', {'action': 'registrar_proveedor', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.get("/proveedor/{proveedor_id}")
async def get_proveedor_by_id(proveedor_id: str):
    c = client.Client()

    request_body = { "id_proveedor": proveedor_id }
    service_request = client.Request('prove', {'action': 'consultar_por_id', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.get("/proveedores")
async def listar_proveedores():
    c = client.Client()
    service_request = client.Request('prove', {'action': 'listar_proveedores', 'body': {}})

    c.send(service_request)
    response = c.receive()

    if not response.content.get('proveedores'):
        raise HTTPException(status_code=404, detail="No providers found")

    return response.content

@app.delete("/proveedor/{proveedor_id}")
async def eliminar_proveedor(proveedor_id: str):
    c = client.Client()
    request_body = {"proveedor_id": proveedor_id}
    service_request = client.Request('prove', {'action': 'eliminar_proveedor', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

@app.post("/proveedor/{proveedor_id}")
async def reabastecimiento(proveedor_id: str):
    c = client.Client()
    request_body = {"proveedor_id": proveedor_id}
    service_request = client.Request('prove', {'action': 'solicitud_reabastecimiento', 'body': request_body})

    c.send(service_request)
    response = c.receive()

    return response.content

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
