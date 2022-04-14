import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import { Card } from "./Card";

interface Card {
  id: string;
  name: string;
  thumb: string;
}

interface CardListProps {
  cards: Card[];
}

export function CardList({ cards }: CardListProps) {
  if (!cards.length) {
    return (
      <Box>
        <Heading size="md" color="orange.500">
          No drinks were found
        </Heading>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={["8", "12"]}>
      {cards?.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </SimpleGrid>
  );
}
