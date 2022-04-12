import { api } from "../services/api";

type Filters = {
  category: string | null;
  ingredient: string | null;
};

type Drink = {
  id: string;
  name: string;
  thumb: string;
};

type Drinks = {
  drinks: Drink[];
  currentPage: number;
  lastPage: number;
};

export async function getDrinks(
  page: number = 1,
  { category, ingredient }: Filters
): Promise<Drinks> {
  const url = "/filter.php?" + (category ? `c=${category}` : `i=${ingredient}`);
  //   console.log("URL: ", url);

  const { data } = await api.get(url);

  const drinks = data.drinks.map((drink: any) => {
    return {
      id: drink.idDrink,
      name: drink.strDrink,
      thumb: drink.strDrinkThumb,
    };
  });

  // divide the drinks into pages
  const initPage = page - 1;
  const perPage = 5;
  const drinksPerPage = drinks.slice(
    initPage * perPage,
    initPage * perPage + perPage
  );
  const lastPage = Math.ceil(drinks.length / perPage);

  const response = { drinks: drinksPerPage, currentPage: page, lastPage };

  return response;
}
