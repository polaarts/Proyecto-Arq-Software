"use client";

import React, { useEffect, useState } from "react";
import { Table, Flex, Heading, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const ListarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/proveedores";

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProveedores(data);
        } else {
          setError(`Error al cargar los proveedores: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error de conexión: ${err.message}`);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div>
      <Flex justify="between" align="center" mb="5">
        <Heading>Lista de Proveedores</Heading>
      </Flex>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {proveedores.map((proveedor) => (
              <Table.Row key={proveedor.id}>
                <Table.Cell>{proveedor.id}</Table.Cell>
                <Table.Cell>{proveedor.nombre}</Table.Cell>
                <Table.Cell>{proveedor.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export default ListarProveedores;
