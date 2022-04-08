import { useEffect, useMemo } from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { Header } from "../../components/header";
import { Loader } from "../../components/loader";
import { api } from "../../services/api";

interface DrinkProps {
  name: string;
  category: string;
  alcoholic: string;
  instructions: string;
  thumb: string;
  ingredients: string[];
}

export default function Drink() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(`drink${id}`, () =>
    api.get(`/lookup.php?i=${id}`).then((res) => {
      return res.data.drinks[0] || null;
    })
  );

  const formattedData = useMemo(() => {
    if (!data) return {} as DrinkProps;

    var fields = data;

    var drink: DrinkProps = {
      name: fields.strDrink,
      category: fields.strCategory,
      alcoholic: fields.strAlcoholic,
      instructions: fields.strInstructions,
      thumb: fields.strDrinkThumb,
      ingredients: [
        fields.strIngredient1,
        fields.strIngredient2,
        fields.strIngredient3,
        fields.strIngredient4,
        fields.strIngredient5,
        fields.strIngredient6,
        fields.strIngredient7,
        fields.strIngredient8,
        fields.strIngredient9,
        fields.strIngredient10,
        fields.strIngredient11,
        fields.strIngredient12,
        fields.strIngredient13,
        fields.strIngredient14,
        fields.strIngredient15,
      ].filter((ingredient) => (ingredient ? true : false)),
    };

    return drink;
  }, [data]);

  const drink = formattedData;

  if (isLoading) return <Loader />;

  if (error) return "Sorry, an error has occurred: " + error.message;

  return (
    <>
      <Header />
      <Stack
        as="main"
        maxW={1120}
        mx="auto"
        my={16}
        px={["8", "16"]}
        direction={["column", "column", "row"]}
        spacing={[8, 8, 16, 24]}
      >
        <Box maxW={["100%", "100%", "50%"]}>
          <Image src={drink.thumb} alt={drink.name} borderRadius="md" />
        </Box>

        <Box maxW={["100%", "100%", "40%"]}>
          <Heading color="orange.500" mb="4">
            {drink.name}
          </Heading>

          <Text color="blue.500" fontSize="sm" letterSpacing="wide">
            {drink.category}
            <br />
            {drink.alcoholic}
          </Text>

          <Text fontWeight="bold" fontSize="xl" mt="8" mb="4">
            Ingredients
          </Text>
          <UnorderedList>
            {drink.ingredients.map((ingredient) => (
              <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
          </UnorderedList>

          <Text fontWeight="bold" fontSize="xl" mt="8" mb="4">
            Instructions
          </Text>
          <Text>{drink.instructions}</Text>
        </Box>
      </Stack>
    </>
  );
}
