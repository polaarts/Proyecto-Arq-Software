"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Flex,
  Heading,
  TextField,
  Button,
  Dialog,
  Checkbox,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";

export default function ListarVentas() {
  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Obtener ventas del backend
    const obtenerVentas = async () => {
      const API_URL = "http://127.0.0.1:8000/ventas"; // Ajusta según tu backend

      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok) {
          setVentas(data);
        } else {
          console.error("Error al obtener ventas:", data.message);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    obtenerVentas();
  }, []);

  // Función para eliminar una venta
  const handleDelete = (id) => {
    const updatedVentas = ventas.filter((venta) => venta.id !== id);
    setVentas(updatedVentas);
    // Aquí podrías hacer una solicitud al backend para eliminar la venta
  };

  return (
    <>
      <Flex justify="between" align="center" mb="5">
        <Heading>Listado de Ventas</Heading>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID Venta</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Productos</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {ventas.map((venta) => (
            <Table.Row key={venta.id}>
              <Table.Cell>{venta.id}</Table.Cell>
              <Table.Cell>
                {venta.productos.map((producto, index) => (
                  <div key={index}>
                    {`ID: ${producto.id_producto} - Cantidad: ${producto.cantidad}`}
                  </div>
                ))}
              </Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <TrashIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(venta.id)}
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
