import { Box, Flex, Link } from "@radix-ui/themes";
export default function Navbar() {
  const links = [
    {
      icon: "icon",
      name: "Inicio",
      url: "/",
    },
    {
      icon: "icon",
      name: "Inventario",
      url: "/inventario",
    },
    {
      icon: "icon",
      name: "Reportes",
      url: "/reportes",
    },
    {
      icon: "icon",
      name: "Login",
      url: "/login",
    },
  ];
  return (
    <Flex gap="3" justify="center" className="py-6">
      {links.map((link) => {
        return (
          <Box key={link.url}>
            <Link href={link.url}>{link.name}</Link>
          </Box>
        );
      })}
    </Flex>
  );
}
