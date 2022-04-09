import { useQuery } from "react-query";

import { api } from "../services/api";

async function getCategories(): Promise<string[]> {
  const { data } = await api.get("list.php?c=list");

  const categories = data.drinks
    .map((category: { strCategory: string }) => category.strCategory)
    .sort();

  return categories;
}

export function useCategories() {
  return useQuery<string[], Error>("categories", () => getCategories(), {
    staleTime: Infinity,
  });
}
