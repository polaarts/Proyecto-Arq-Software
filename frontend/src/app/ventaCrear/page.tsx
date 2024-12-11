"use client";

import { useState } from "react";
import { Flex, Heading, TextField, Button, Text } from "@radix-ui/themes";

const CrearVenta: React.FC = () => {
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const API_URL = "http://127.0.0.1:8000/ventas";

    try {
      // Construir el objeto con el formato esperado por el endpoint
      const ventaData = {
        productos: [
          {
            id_producto: Number(productoId), // Convertir a número para asegurar el tipo correcto
            cantidad: cantidad,
          },
        ],
      };

      // Enviar la solicitud al backend
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      // Procesar la respuesta del backend
      const result = await response.json();
      if (response.ok) {
        setMessage(`Venta creada exitosamente: ${result.message}`);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ height: "100vh" }}
    >
      <Heading className="mb-4">Crear Venta</Heading>

      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextField.Root
          label="ID del Producto"
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          required
          placeholder="Ingresa el ID del Producto"
          style={{ marginBottom: "12px" }}
        />

        <TextField.Root
          type="number"
          label="Cantidad"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(Number(e.target.value))}
          required
          placeholder="Ingresa la cantidad"
          style={{ marginBottom: "12px" }}
        />

        <Button type="submit" style={{ width: "100%", marginTop: "12px" }}>
          Enviar{" "}
        </Button>
      </form>

      {message && (
        <Text
          size="2"
          style={{
            color: message.includes("Error") ? "red" : "green",
            marginTop: "16px",
          }}
        >
          {message}
        </Text>
      )}
    </Flex>
  );
};

export default CrearVenta;
