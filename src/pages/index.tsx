import {
  Button,
  Flex,
  Text,
  Heading,
  Box,
  Image,
  VStack,
  Link,
} from "@chakra-ui/react";

import { Header } from "../components/header";

export default function Home() {
  return (
    <Flex direction="column" w="100vw" h="100vh" bg={"blue.900"}>
      <Header />

      <Flex
        as="main"
        direction="column"
        w="100%"
        h="100%"
        maxW={[400, 640, 640, 860]}
        px="6"
        mx="auto"
        justify="center"
        position="relative"
      >
        <VStack spacing="6" align="flex-start" zIndex="2">
          <Heading maxW="640" fontSize={["3xl", "3xl", "5xl"]}>
            THE WIKI FOR DRINKS. <br /> HERE YOU WILL FIND YOUR PERFECT MATCH.
          </Heading>

          <Button bg="orange.500" w="200px" p="8" fontWeight="regular">
            Show me a drink
          </Button>

          <Text maxW={400}>
            Enjoy the big veriety of drinks, alocholic and non-alocholic, check
            the receipe and share it with your friends.
          </Text>
        </VStack>

        <Box
          boxSize={["xs", "sm", "md"]}
          position="absolute"
          top="24"
          right="0"
        >
          <Image src="/images/bartender.jpg" alt="Drink" />
        </Box>
      </Flex>
    </Flex>
  );
}
