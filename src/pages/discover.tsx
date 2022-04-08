import {
  VStack,
  Box,
  Heading,
  Text,
  InputGroup,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { Header } from "../components/header";

export default function Discover() {
  return (
    <VStack w="100vw" h="100vh">
      <Header />

      <VStack as="main" maxW={640} pt={["8", "16"]} align="center" spacing="8">
        <Heading textAlign="center">
          SEARCH SOME DRINK BY CATEGORY OR INGREDIENT
        </Heading>

        <Text color="blue.500">
          We will show you the best options, we promise
        </Text>

        <Box w="100%">
          <InputGroup border="1px">
            <Select placeholder="Category" w="sm" border="0" borderRadius="0">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>

            <Text alignSelf="center" mx="4">
              or
            </Text>

            <Input
              type="text"
              placeholder="type an ingedient"
              border="0"
              borderRadius="0"
            />

            <Button bg="none" border="1px" borderRadius="0">
              <Search2Icon color="gray.300" />
            </Button>
          </InputGroup>
        </Box>
      </VStack>
    </VStack>
  );
}
