import { Table, Flex, Heading, TextField } from "@radix-ui/themes";
import {
  Pencil1Icon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export default function Inventario() {
  const headers = [
    "Nombre",
    "Tipo",
    "Marca",
    "Precio",
    "Categoría",
    "Sucursal",
    "Vencimiento",
    "Stock",
    "Acciones",
  ];
  const actions = {
    Pencil: Pencil1Icon,
    Trash: TrashIcon,
  };
  const keys = ["Pencil", "Trash"];

  const data = [
    {
      nombre: "Cereal Choco",
      tipo: "Alimento",
      marca: "Nestlé",
      precio: "$3.500",
      categoria: "Desayuno",
      sucursal: "Sucursal Centro",
      vencimiento: "2025-01-15",
      stock: 120,
    },
    {
      nombre: "Shampoo Anticaspa",
      tipo: "Higiene",
      marca: "Head & Shoulders",
      precio: "$5.800",
      categoria: "Cuidado Personal",
      sucursal: "Sucursal Norte",
      vencimiento: "2024-08-30",
      stock: 50,
    },
    {
      nombre: "Leche Entera",
      tipo: "Lácteo",
      marca: "Colún",
      precio: "$1.200",
      categoria: "Bebidas",
      sucursal: "Sucursal Sur",
      vencimiento: "2023-12-10",
      stock: 200,
    },
  ];

  return (
    <>
      <Heading className="mb-4">Gestión del Inventario</Heading>

      <TextField.Root mb="5" variant="soft" placeholder="Enter package number">
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
      </TextField.Root>
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
          {data.map((product) => (
            <Table.Row key={`${product.nombre}-${product.sucursal}`}>
              <Table.Cell>{product.nombre}</Table.Cell>
              <Table.Cell>{product.tipo}</Table.Cell>
              <Table.Cell>{product.marca}</Table.Cell>
              <Table.Cell>{product.precio}</Table.Cell>
              <Table.Cell>{product.categoria}</Table.Cell>
              <Table.Cell>{product.sucursal}</Table.Cell>
              <Table.Cell>{product.vencimiento}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  {keys.map((key, index) => {
                    const Component = actions[key];
                    return <Component key={index} />;
                  })}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
