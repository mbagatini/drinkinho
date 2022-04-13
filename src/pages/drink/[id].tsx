import {
  Box,
  Heading,
  Image,
  ListItem,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
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

  const { isLoading, error, data } = useQuery<any, Error>(`drink${id}`, () =>
    api.get(`/lookup.php?i=${id}`).then((res) => {
      return res.data.drinks[0] || null;
    })
  );

  const formattedData = useMemo(() => {
    if (!data) return {} as DrinkProps;

    var drink: DrinkProps = {
      name: data.strDrink,
      category: data.strCategory,
      alcoholic: data.strAlcoholic,
      instructions: data.strInstructions,
      thumb: data.strDrinkThumb,
      ingredients: [
        data.strIngredient1,
        data.strIngredient2,
        data.strIngredient3,
        data.strIngredient4,
        data.strIngredient5,
        data.strIngredient6,
        data.strIngredient7,
        data.strIngredient8,
        data.strIngredient9,
        data.strIngredient10,
        data.strIngredient11,
        data.strIngredient12,
        data.strIngredient13,
        data.strIngredient14,
        data.strIngredient15,
      ].filter((ingredient) => (ingredient ? true : false)),
    };

    return drink;
  }, [data]);

  const drink = formattedData;

  if (error) return "Sorry, an error has occurred: " + error.message;

  return (
    <>
      <Header />
      <Stack
        as="main"
        maxW={1120}
        mx="auto"
        my="16"
        px={["8", "16"]}
        direction={["column", "column", "row"]}
        spacing={[8, 8, 16, 24]}
      >
        <Box maxW={["100%", "100%", "50%"]}>
          <Skeleton isLoaded={!isLoading}>
            <Image
              src={drink.thumb}
              alt={drink.name}
              borderRadius="md"
              boxShadow="18px 16px 18px -12px #ffffff8e"
            />
          </Skeleton>
        </Box>

        <Box maxW={["100%", "100%", "40%"]}>
          {isLoading ? (
            <SkeletonText noOfLines={6} />
          ) : (
            <>
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
                {drink?.ingredients.map((ingredient) => (
                  <ListItem key={ingredient}>{ingredient}</ListItem>
                ))}
              </UnorderedList>

              <Text fontWeight="bold" fontSize="xl" mt="8" mb="4">
                Instructions
              </Text>
              <Text>{drink.instructions}</Text>
            </>
          )}
        </Box>
      </Stack>
    </>
  );
}
