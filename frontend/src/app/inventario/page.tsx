"use client";
import { useState } from "react";
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
  Checkbox,
} from "@radix-ui/themes";
import {
  Pencil1Icon,
  TrashIcon,
  MagnifyingGlassIcon,
  DrawingPinFilledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

export default function Inventario() {
  // Datos iniciales
  const initialData = [
    {
      id: 1,
      nombre: "Cereal Choco",
      tipo: "Alimento",
      marca: "Nestlé",
      precio: "$3.500",
      categoria: ["Desayuno"],
      sucursal: "Sucursal Centro",
      vencimiento: "2025-01-15",
      stock: 120,
    },
    {
      id: 2,
      nombre: "Shampoo Anticaspa",
      tipo: "Higiene",
      marca: "Head & Shoulders",
      precio: "$5.800",
      categoria: ["Cuidado Personal"],
      sucursal: "Sucursal Norte",
      vencimiento: "2024-08-30",
      stock: 50,
    },
    {
      id: 3,
      nombre: "Leche Entera",
      tipo: "Lácteo",
      marca: "Colún",
      precio: "$1.200",
      categoria: ["Bebidas"],
      sucursal: "Sucursal Sur",
      vencimiento: "2023-12-10",
      stock: 200,
    },
  ];

  // Procesar los datos para incluir el precio numérico
  const processData = (data) =>
    data.map((item) => {
      const priceString = item.precio.replace(/\$|\./g, "");
      const precioNumero = parseFloat(priceString);
      return { ...item, precioNumero };
    });

  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState(processData(initialData));

  // Encontrar el precio máximo en los datos
  const maxPriceInData = Math.max(...products.map((item) => item.precioNumero));
  const [maxPrice, setMaxPrice] = useState(maxPriceInData);

  // Encontrar el stock máximo y mínimo en los datos
  const maxStockInData = Math.max(...products.map((item) => item.stock));
  const [stockRange, setStockRange] = useState([0, maxStockInData]);

  const headers = [
    "Nombre",
    "Descripcion",
    "Precio",
    "Categoría",
    "Sucursal",
    "Stock",
    "Acciones",
  ];

  // Obtener categorías únicas
  const allCategories = [
    ...new Set(products.flatMap((item) => item.categoria)),
  ];

  // Filtrar los datos según los filtros aplicados
  const filteredData = products.filter((product) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.categoria.includes(selectedCategory);
    const matchesPrice = product.precioNumero <= maxPrice;
    const matchesStock =
      product.stock >= stockRange[0] && product.stock <= stockRange[1];

    return matchesSearchTerm && matchesCategory && matchesPrice && matchesStock;
  });

  // Función para eliminar un producto
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // Función para guardar los cambios de un producto editado
  const handleProductSave = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Función para agregar un nuevo producto
  const handleProductAdd = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <>
      <Flex justify="between" align="center" className="mb-4">
        <Heading>Gestión del Inventario</Heading>
      </Flex>

      <Flex gap="3" mb="5" wrap="wrap">
        <AddProductDialog
          onSave={handleProductAdd}
          nextId={products.length + 1}
          allCategories={allCategories}
        />
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

        {/* Filtro por categoría */}
        <Select.Root
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
        >
          <Select.Trigger placeholder="Categoría">
            {selectedCategory === "all"
              ? "Todas las categorías"
              : selectedCategory}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Todas las categorías</Select.Item>
            {allCategories.map((category) => (
              <Select.Item key={category} value={category}>
                {category}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        {/* Filtro por precio */}
        <Flex direction="column" align="start" style={{ minWidth: "200px" }}>
          <Text>Precio máximo: ${maxPrice}</Text>
          <Slider
            value={[maxPrice]}
            onValueChange={(value) => setMaxPrice(value[0])}
            min={0}
            max={maxPriceInData}
            step={100}
          />
        </Flex>

        {/* Filtro por stock */}
        <Flex direction="column" align="start" style={{ minWidth: "200px" }}>
          <Text>
            Cantidad de stock: {stockRange[0]} - {stockRange[1]}
          </Text>
          <Slider
            value={stockRange}
            onValueChange={(value) => setStockRange(value)}
            min={0}
            max={maxStockInData}
            step={1}
          />
        </Flex>
      </Flex>

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
          {filteredData.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.nombre}</Table.Cell>
              <Table.Cell>{product.descripcion}</Table.Cell>
              <Table.Cell>{product.precio}</Table.Cell>
              <Table.Cell>{product.categoria.join(", ")}</Table.Cell>
              <Table.Cell>{product.sucursal}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <EditProductDialog
                    product={product}
                    onSave={handleProductSave}
                  />
                  <TrashIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(product.id)}
                  />
                  <ManageCategoriesDialog
                    product={product}
                    allCategories={allCategories}
                    onSave={handleProductSave}
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

// Componente para el modal de edición
function EditProductDialog({ product, onSave }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    // Actualizar precio numérico
    const priceString = editedProduct.precio.replace(/\$|\./g, "");
    const precioNumero = parseFloat(priceString);
    const updatedProduct = { ...editedProduct, precioNumero };
    onSave(updatedProduct);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Pencil1Icon style={{ cursor: "pointer" }} />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Editar Producto</Dialog.Title>
        <Dialog.Description>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Nombre
              </Text>
              <TextField.Root
                name="nombre"
                value={editedProduct.nombre}
                onChange={handleChange}
              />
            </label>

            {/* Repite para los demás campos */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Tipo
              </Text>
              <TextField.Root
                name="tipo"
                value={editedProduct.tipo}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Marca
              </Text>
              <TextField.Root
                name="marca"
                value={editedProduct.marca}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Precio
              </Text>
              <TextField.Root
                name="precio"
                value={editedProduct.precio}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Sucursal
              </Text>
              <TextField.Root
                name="sucursal"
                value={editedProduct.sucursal}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Vencimiento
              </Text>
              <TextField.Root
                type="date"
                name="vencimiento"
                value={editedProduct.vencimiento}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Stock
              </Text>
              <TextField.Root
                type="number"
                name="stock"
                value={editedProduct.stock}
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

// Componente para gestionar categorías
function ManageCategoriesDialog({ product, allCategories, onSave }) {
  const [selectedCategories, setSelectedCategories] = useState([
    ...product.categoria,
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleSave = () => {
    const updatedProduct = { ...product, categoria: selectedCategories };
    onSave(updatedProduct);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <DrawingPinFilledIcon style={{ cursor: "pointer" }} />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Gestionar Categorías</Dialog.Title>
        <Dialog.Description>
          <Flex direction="column" gap="3">
            <Text as="div" size="2" mb="1">
              Selecciona las categorías:
            </Text>

            <Flex direction="column" gap="2">
              {allCategories.map((category) => (
                <Flex key={category} align="center">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    id={category}
                  />
                  <label htmlFor={category} style={{ marginLeft: "8px" }}>
                    {category}
                  </label>
                </Flex>
              ))}
            </Flex>

            <Flex gap="2" align="center" mt="2">
              <TextField.Root
                placeholder="Nueva categoría"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              ></TextField.Root>
              <Button onClick={handleAddCategory}>Agregar</Button>
            </Flex>
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

// Componente para agregar un nuevo producto
function AddProductDialog({ onSave, nextId, allCategories }) {
  const initialProduct = {
    id: nextId,
    nombre: "",
    tipo: "",
    marca: "",
    precio: "",
    categoria: [],
    sucursal: "",
    vencimiento: "",
    stock: 0,
  };

  const [newProduct, setNewProduct] = useState(initialProduct);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleSave = () => {
    // Actualizar precio numérico
    const priceString = newProduct.precio.replace(/\$|\./g, "");
    const precioNumero = parseFloat(priceString);

    const productToAdd = {
      ...newProduct,
      precioNumero,
      categoria: selectedCategories,
    };

    onSave(productToAdd);
    // Resetear el formulario
    setNewProduct({ ...initialProduct, id: nextId + 1 });
    setSelectedCategories([]);
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
                Nombre
              </Text>
              <TextField.Root
                name="nombre"
                value={newProduct.nombre}
                onChange={handleChange}
              />
            </label>

            {/* Repite para los demás campos */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Tipo
              </Text>
              <TextField.Root
                name="tipo"
                value={newProduct.tipo}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Marca
              </Text>
              <TextField.Root
                name="marca"
                value={newProduct.marca}
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
                Sucursal
              </Text>
              <TextField.Root
                name="sucursal"
                value={newProduct.sucursal}
                onChange={handleChange}
              ></TextField.Root>
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Vencimiento
              </Text>
              <TextField.Root
                type="date"
                name="vencimiento"
                value={newProduct.vencimiento}
                onChange={handleChange}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Stock
              </Text>
              <TextField.Root
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
              />
            </label>

            {/* Gestión de categorías */}
            <Text as="div" size="2" mb="1" weight="bold">
              Categorías
            </Text>
            <Flex direction="column" gap="2">
              {allCategories.map((category) => (
                <Flex key={category} align="center">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    id={category}
                  />
                  <label htmlFor={category} style={{ marginLeft: "8px" }}>
                    {category}
                  </label>
                </Flex>
              ))}
            </Flex>
            <Flex gap="2" align="center" mt="2">
              <TextField.Root
                placeholder="Nueva categoría"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              ></TextField.Root>
              <Button onClick={handleAddCategory}>Agregar</Button>
            </Flex>

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
