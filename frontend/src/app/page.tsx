"use client";

import React from "react";
import { Flex, Heading, Text } from "@radix-ui/themes";

const DescripcionSistema = () => {
  return (
    <div>
      <Flex justify="center" align="center" direction="column" mb="5">
        <Heading as="h1">Sistema de Gestión de Inventarios</Heading>
      </Flex>

      <Text size="5" lineHeight="1.5" color="gray" style={{ padding: "20px" }}>
        El sistema a desarrollar es un Sistema de Gestión de Inventarios para una tienda minorista
        de productos deportivos como calzado, vestuario, accesorios y equipamiento de distintas
        disciplinas, entre otros. Esta organización tiene varias sucursales, por lo que necesita
        un sistema para facilitar la gestión y control del inventario de cada tienda. Cada sucursal
        es administrada de manera individual, con acceso independiente a su inventario. Sin embargo,
        la gestión de proveedores y órdenes de reabastecimiento, son centralizados, lo que permite que
        las sucursales compartan datos críticos, como la disponibilidad de productos y tendencias de ventas.
        La gestión de inventarios también es centralizada, permitiendo a la matriz monitorear en tiempo real
        el stock de todas las sucursales.
      </Text>
    </div>
  );
};

export default DescripcionSistema;
