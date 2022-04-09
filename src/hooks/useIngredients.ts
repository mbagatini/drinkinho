import { useQuery } from "react-query";

import { api } from "../services/api";

async function getIngredients(): Promise<string[]> {
  const { data } = await api.get("list.php?i=list");

  const ingredients = data.drinks
    .map((category: { strCategory: string }) => category.strCategory)
    .sort();

  return ingredients;
}

export function useIngredients() {
  return useQuery<string[], Error>("ingredients", () => getIngredients(), {
    staleTime: Infinity,
  });
}
