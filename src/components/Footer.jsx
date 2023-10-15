import {
  Box,
  Container,
  Text,
  VStack,
  Stack,
  Link,
  Flex,
} from "@chakra-ui/react";
import { Label } from "reactstrap";
import "boxicons";

export default function Footer() {
  return (
    <Box bgColor="gray.100" color="light" w="100%" mt={5}>
      <Container maxW="container.xl" py={4}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex="3">
            <Text fontSize="4xl" fontWeight="bold">
              BRANGKAS
            </Text>
          </Box>

          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold">Muhammad Yusuf</Text>
            <Link href="https://www.linkedin.com/in/muhammad-yusuf-subhan/">
              <box-icon name="linkedin-square" type="logo"></box-icon>
            </Link>

            <Link href="https://github.com/enginoir">
              <box-icon name="github" type="logo"></box-icon>
            </Link>
          </Box>

          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold"> Leonardo E Rambing </Text>
            <Link href="https://www.instagram.com/creamymilk__/">
              <box-icon type="logo" name="instagram"></box-icon>
            </Link>

            <Link href="https://github.com/Creamymile">
              <box-icon name="github" type="logo"></box-icon>
            </Link>
          </Box>
          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold">Helmi Siswo Effendi</Text>
            <Link href="https://www.linkedin.com/in/muhammad-yusuf-subhan/">
              <box-icon name="linkedin-square" type="logo"></box-icon>
            </Link>

            <Link href="https://github.com/enginoir">
              <box-icon name="github" type="logo"></box-icon>
            </Link>
          </Box>
          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold">Robiatul Adawiyah</Text>
            <Link href="https://www.linkedin.com/in/muhammad-yusuf-subhan/">
              <box-icon name="linkedin-square" type="logo"></box-icon>
            </Link>

            <Link href="https://github.com/enginoir">
              <box-icon name="github" type="logo"></box-icon>
            </Link>
          </Box>
        </Flex>

        <Box textAlign="center" py={3} mt={1} bg="rgba(0, 0, 0, 0.2)">
          © {new Date().getFullYear()} Copyright:{" "}
          <Link color="black" href="/">
            Brangkas
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
