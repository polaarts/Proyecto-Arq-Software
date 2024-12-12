# Arquitectura de Software: Proyecto Semestral.

El sistema a desarrollar es un Sistema de Gestión de Inventarios para una tienda minorista de productos deportivos como calzado, vestuario, accesorios y equipamiento de distintas disciplinas, entre otros. Esta organización tiene varias sucursales, por lo que necesita un sistema para facilitar la gestión y control del inventario de cada tienda. Cada sucursal es administrada de manera individual, con acceso independiente a su inventario. Sin embargo, la gestión de proveedores y órdenes de reabastecimiento, son centralizados, lo que permite que las sucursales compartan datos críticos, como la disponibilidad de productos y tendencias de ventas.

La gestión de inventarios también es centralizada, permitiendo a la matriz monitorear en tiempo real el stock de todas las sucursales. Sin embargo, cada tienda puede hacer ajustes manuales en su propio inventario si es necesario.

**Integrantes:** Samuel Angulo, Nicolás Guerra, Guandgyi Qi, Pedro Sandoval, Alan Toro.

### Levantar Backend

```bash
python3 -m venv venv

source venv/bin/activate

docker network create soa

docker run -d -p 5000:5000 --name soabus --network soa jrgiadach/soabus:v1

pip install -r requirements.txt

pip install "fastapi[standard]"

fastapi dev src/clients/main.py
```

### Frontend (WIP, todavía no funcional)

## Requerimientos funcionales implementados.

### A. Requerimientos de Gestión:

- **RF1**: Registrar, editar, eliminar y listar productos del inventario.
- **RF2**: Proporcionar un buscador que permita filtrar productos por nombre.
- **RF3**: Permitir la creación de categorías personalizadas para organizar los productos del
inventario según las necesidades de la tienda.
- **RF4**: Modificar el Stock de un producto.
- **RF5**: Agregar, visualizar y eliminar productos a una categoría.
- **RF6**: Se puede listar los productos con menos de 10 unidades en inventario para verificar
baja de stock.

### B. Requerimientos de gestión de ventas:
- **RF7**: Se puede crear una venta.
- **RF8**: Se puede listar el total de ventas.

### C. Requerimientos de gestión de proveedores:
- **RF9**: Agregar, listar y eliminar de proveedores.
- **RF10**: Enviar solicitud de re-abastecimiento para una visita a local.
