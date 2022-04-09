import { Button, Text, Heading, Box, Image, VStack } from "@chakra-ui/react";
import router from "next/router";

import { Header } from "../components/Header";
import { api } from "../services/api";

export default function Home() {
  async function hadleRandomDrink() {
    const response = await api.get("/random.php");
    const drink = response.data.drinks[0] || null;

    router.push(`/drink/${drink.idDrink}`);
  }

  return (
    <VStack w="100vw" h="100vh">
      <Header />

      <VStack
        as="main"
        w="100%"
        h="100%"
        maxW={[400, 640, 640, 860]}
        px="6"
        pb={["10", "0"]}
        mx="auto"
        justify={["flex-end", "center"]}
        position="relative"
      >
        <VStack spacing="6" align="flex-start" zIndex="2">
          <Heading maxW="640" fontSize={["3xl", "3xl", "5xl"]}>
            THE WIKI FOR DRINKS. <br /> HERE YOU WILL FIND YOUR PERFECT MATCH.
          </Heading>

          <Button
            bg="orange.500"
            w="200px"
            p="8"
            fontWeight="regular"
            onClick={hadleRandomDrink}
          >
            Show me a drink
          </Button>

          <Text maxW={300}>
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
      </VStack>
    </VStack>
  );
}
