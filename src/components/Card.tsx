import {
  Flex,
  Image,
  Link as ChakraLink,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface Card {
  id: string;
  name: string;
  thumb: string;
}

interface CardProps {
  data: Card;
}

export function Card({ data }: CardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/drink/${data.id}`} passHref>
      <ChakraLink>
        <VStack
          spacing="6"
          h="calc(100% - 2rem)"
          mt="6"
          align="flex-start"
          bg="white.100"
          borderRadius="md"
        >
          <Skeleton isLoaded={!isLoading}>
            <Flex position="relative" justify="center" px="4" mt="-6">
              <Image
                src={data.thumb}
                alt={data.name}
                borderRadius="lg"
                boxShadow="0 16px 32px -12px rgba(0,0,0,0.56)"
                objectFit="cover"
                onLoad={() => setIsLoading(false)}
              />
            </Flex>
          </Skeleton>

          <Text p="6" mt="0 !important" color="blue.900" fontWeight="semibold">
            {data.name}
          </Text>
        </VStack>
      </ChakraLink>
    </Link>
  );
}
