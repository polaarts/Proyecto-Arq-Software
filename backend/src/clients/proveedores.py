#!/usr/bin/env python3

import sys
import os
from typing import List
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