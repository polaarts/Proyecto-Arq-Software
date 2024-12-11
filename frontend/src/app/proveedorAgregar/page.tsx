"use client";

import { useState } from "react";
import { TextField, Button, Flex, Heading, Text } from "@radix-ui/themes";

const CrearProveedor = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const API_URL = "http://127.0.0.1:8000/proveedor";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Proveedor creado exitosamente: ${result.message}`);
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
      <Heading>Crear Proveedor</Heading>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px", marginTop: "20px" }}
      >
        <Flex direction="column" gap="4">
          <TextField.Root
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Proveedor"
            required
          />

          <TextField.Root
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            placeholder="Contacto"
            required
          />

          <TextField.Root
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />

          <TextField.Root
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />

          <TextField.Root
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Button type="submit">Enviar</Button>
        </Flex>
      </form>

      {message && (
        <Text
          style={{
            marginTop: "20px",
            color: message.startsWith("Error") ? "red" : "green",
          }}
        >
          {message}
        </Text>
      )}
    </Flex>
  );
};

export default CrearProveedor;
