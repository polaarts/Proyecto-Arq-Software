# Arquitectura de Software: Proyecto Semestral.

El sistema a desarrollar es un Sistema de Gestión de Inventarios para una tienda minorista de productos deportivos como calzado, vestuario, accesorios y equipamiento de distintas disciplinas, entre otros. Esta organización tiene varias sucursales, por lo que necesita un sistema para facilitar la gestión y control del inventario de cada tienda. Cada sucursal es administrada de manera individual, con acceso independiente a su inventario. Sin embargo, la gestión de proveedores y órdenes de reabastecimiento, son centralizados, lo que permite que las sucursales compartan datos críticos, como la disponibilidad de productos y tendencias de ventas.

La gestión de inventarios también es centralizada, permitiendo a la matriz monitorear en tiempo real el stock de todas las sucursales. Sin embargo, cada tienda puede hacer ajustes manuales en su propio inventario si es necesario.

**Integrantes:** Samuel Angulo, Alan Toro, Guandgyi Qi, Pedro Sandoval, Alan Toro.

## Requerimientos funcionales.

### A. Requerimientos de Gestión:

- **RF1**: Registrar, editar y eliminar productos.
- **RF2**: Proporcionar un buscador que permita filtrar productos por nombre, tipo, marca, precio, etc.
- **RF3**: Permitir la creación de categorías personalizadas para organizar los productos del inventario según las necesidades de la tienda.

### B. Requerimientos de Monitoreo:

- **RF4**: Actualización en tiempo real del stock de cada sucursal al realizar ventas, devoluciones o entradas de nuevos productos.
- **RF5**: Visualización de inventario por categoría o por sucursal.
- **RF6**: Monitorear los productos que están por alcanzar su fecha de vencimiento y generar alertas para su pronta venta o disposición.

### C. Requerimientos de notificaciones:

- **RF7**: Alertas para productos bajos en stock.
- **RF8**: Notificaciones para reabastecimiento programado.

### D. Requerimientos de gestión de proveedores:

- **RF9**: Registro y gestión de proveedores.
- **RF10**: Creación de órdenes de compra automatizadas.

### E. Requerimientos de reportes y análisis:

- **RF11**: Generación de reportes de inventario, ventas y productos más vendidos.
- **RF12**: Visualiación de tendencias de ventas mediante gráficos mensuales en donde se incluyen los productos más vendidos, las fechas de mayor demanda y la variabilidad de stock a lo largo del tiempo. Estos gráficos pueden ser barras, líneas de tiempo y tablas dinámicas.

### F. Requerimientos d seguridad y acceso:

- **RF13**: Control de acceso basado en niveles de seguridad. Los administradores tienen permisos completos para modificar el inventario, mientras que los empleados de bodega tienen acceso limitado a la consulta y actualización de stock. Estos niveles de acceso son destinados a la protección de la integridad de los datos y para garantizar que solamente usuarios autorizados puedan realizar modificaciones.

- **RF14**: Mantener un registro de las modificaciones realizadas en el inventario.
