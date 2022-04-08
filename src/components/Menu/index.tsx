import {
  Flex,
  Text,
  Image,
  Link as ChakraLink,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";

export function NavMenu() {
  const showHomeLink = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px={["8", "16"]}
      align="center"
      justify="space-between"
    >
      <Flex>
        <Link href="/" passHref>
          <ChakraLink display="flex">
            <Image
              boxSize={["24px", "32px"]}
              objectFit="cover"
              src="/images/cocktail_sem_borda.png"
              alt="Drinkinho"
            />
            <Text ml="4" my="auto" fontSize="lg" fontWeight="medium">
              Drinkinho.co
            </Text>
          </ChakraLink>
        </Link>
      </Flex>

      <Flex>
        {showHomeLink && (
          <Link href="/" passHref>
            <ChakraLink display="flex" ml="10">
              <Text ml="4">Home</Text>
            </ChakraLink>
          </Link>
        )}

        <Link href="/" passHref>
          <ChakraLink display="flex" ml="6">
            <Text ml="4">Discover</Text>
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
  );
}
