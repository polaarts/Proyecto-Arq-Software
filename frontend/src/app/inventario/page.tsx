"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Flex,
  Heading,
  TextField,
  Select,
  Slider,
  Text,
  Dialog,
  Button,
} from "@radix-ui/themes";
import {
  Pencil1Icon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

export default function Inventario() {
  const API_GET_URL = "http://127.0.0.1:8000/inventario/productos";
  const API_POST_URL = "http://127.0.0.1:8000/inventario/producto";

  // Estados
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Fetch inicial de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_GET_URL);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError(`Error al cargar los productos: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error de conexión: ${err.message}`);
      }
    };

    fetchProducts();
  }, []);

  const headers = [
    "ID Producto",
    "Nombre",
    "Descripción",
    "Precio",
    "Cantidad",
    "ID Proveedor",
    "Acciones",
  ];

  // Filtrado de productos
  const filteredProducts = products.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Agregar un nuevo producto
  const handleProductAdd = async (newProduct) => {
    try {
      const response = await fetch(API_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
      } else {
        console.error("Error al agregar producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión:", error.message);
    }
  };

  return (
    <>
      <Flex justify="between" align="center" className="mb-4">
        <Heading>Gestión del Inventario</Heading>
      </Flex>

      <Flex gap="3" mb="5" wrap="wrap">
        <AddProductDialog onSave={handleProductAdd} />
        {/* Campo de búsqueda */}
        <TextField.Root
          variant="soft"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {error && <Text color="red">{error}</Text>}

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headers.map((title) => (
              <Table.ColumnHeaderCell key={title}>
                {title}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredProducts.map((product) => (
            <Table.Row key={product.id_producto}>
              <Table.Cell>{product.id_producto}</Table.Cell>
              <Table.Cell>{product.nombre_producto}</Table.Cell>
              <Table.Cell>{product.descripcion}</Table.Cell>
              <Table.Cell>${product.precio}</Table.Cell>
              <Table.Cell>{product.cantidad}</Table.Cell>
              <Table.Cell>{product.id_proveedor}</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <Pencil1Icon style={{ cursor: "pointer" }} />
                  <TrashIcon style={{ cursor: "pointer" }} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

// Componente para agregar un producto
function AddProductDialog({ onSave }) {
  const initialProduct = {
    cantidad: 0,
    id_producto: "",
    nombre_producto: "",
    descripcion: "",
    precio: "",
    id_proveedor: "",
  };

  const [newProduct, setNewProduct] = useState(initialProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...newProduct,
      id_producto: Number(newProduct.id_producto),
      precio: parseFloat(newProduct.precio),
      cantidad: parseInt(newProduct.cantidad),
      id_proveedor: Number(newProduct.id_proveedor),
    });
    setNewProduct(initialProduct); // Resetear formulario
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <PlusIcon style={{ marginRight: "8px" }} />
          Agregar Producto
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Agregar Producto</Dialog.Title>
        <Dialog.Description>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                ID Producto
              </Text>
              <TextField.Root
                name="id_producto"
                value={newProduct.id_producto}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Nombre
              </Text>
              <TextField.Root
                name="nombre_producto"
                value={newProduct.nombre_producto}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Descripción
              </Text>
              <TextField.Root
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Precio
              </Text>
              <TextField.Root
                name="precio"
                value={newProduct.precio}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Cantidad
              </Text>
              <TextField.Root
                name="cantidad"
                value={newProduct.cantidad}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                ID Proveedor
              </Text>
              <TextField.Root
                name="id_proveedor"
                value={newProduct.id_proveedor}
                onChange={handleChange}
              />
            </label>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close asChild>
                <Button variant="soft" color="gray">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button onClick={handleSave}>Guardar</Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}
