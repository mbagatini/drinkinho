import { Heading, Progress, VStack } from "@chakra-ui/react";

export function Loader() {
  return (
    <VStack maxW={640} h="100vh" mx="auto" px="16" justify="center" spacing="6">
      <Progress w="100%" colorScheme="orange" size="sm" isIndeterminate />
      <Heading fontWeight="thin">Loading...</Heading>
    </VStack>
  );
}
