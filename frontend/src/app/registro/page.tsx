import { Table, Flex, Heading, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

// Datos simulados para poblar la tabla
const logData = [
  {
    product: "Cereal Choco",
    action: "Agregado",
    quantity: 30,
    user: "Juan Pérez",
    role: "Administrador",
    date: "2024-11-19 10:30",
  },
  {
    product: "Shampoo Anticaspa",
    action: "Removido",
    quantity: 10,
    user: "María López",
    role: "Trabajador",
    date: "2024-11-19 11:00",
  },
  {
    product: "Leche Entera",
    action: "Agregado",
    quantity: 50,
    user: "Carlos Ruiz",
    role: "Trabajador",
    date: "2024-11-20 09:15",
  },
  {
    product: "Cereal Choco",
    action: "Removido",
    quantity: 30,
    user: "Carlos Ruiz",
    role: "Trabajador",
    date: "2024-11-19 11:30",
  },
  {
    product: "Shampoo Anticaspa",
    action: "Agregado",
    quantity: 10,
    user: "María López",
    role: "Trabajador",
    date: "2024-11-19 05:00",
  },
];

export default function InventoryLog() {
  const headers = ["Producto", "Acción", "Cantidad", "Usuario", "Rol", "Fecha"];

  return (
    <>
      <Heading className="mb-4">
        Registro de Modificaciones de Inventario
      </Heading>

      <TextField.Root mb="5" variant="soft" placeholder="Buscar en el registro">
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
          {logData.map((entry, index) => (
            <Table.Row key={`${entry.product}-${index}`}>
              <Table.Cell>{entry.product}</Table.Cell>
              <Table.Cell>{entry.action}</Table.Cell>
              <Table.Cell>{entry.quantity}</Table.Cell>
              <Table.Cell>{entry.user}</Table.Cell>
              <Table.Cell>{entry.role}</Table.Cell>
              <Table.Cell>{entry.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
