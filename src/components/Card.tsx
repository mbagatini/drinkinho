import { Box, Image, Text } from "@chakra-ui/react";

interface Card {
  id: string;
  name: string;
  thumb: string;
}

interface CardProps {
  data: Card;
}

export function Card({ data }: CardProps) {
  return (
    <Box>
      <Box>
        <Image src={data.thumb} alt={data.name} objectFit="cover" w="max" />
      </Box>
      <Text>{data.name}</Text>
    </Box>
  );
}
