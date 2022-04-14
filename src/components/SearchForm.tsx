import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { OptionBase } from "chakra-react-select";

import { CustomSelect } from "./CustomSelect";
import { useCategories } from "../hooks/useCategories";
import { useIngredients } from "../hooks/useIngredients";
import { useFilters } from "../hooks/useFilters";

type Filters = {
  category: string | null;
  ingredient: Option | null;
};

interface Option extends OptionBase {
  value: string;
  label: string;
}

interface SearchProps {
  handleSearch: () => void;
}

export function SearchForm({ handleSearch }: SearchProps) {
  const { filters, setFilters } = useFilters();

  const { data: categories } = useCategories();
  const { data: ingredients } = useIngredients();

  const optionsIngredients =
    ingredients?.map((item) => {
      return { value: item, label: item };
    }) ?? [];

  const [categorySelect, setCategorySelect] = useState<string>(
    filters.category ?? ""
  );

  const [ingredientSelect, setIngredientSelect] = useState<Option | null>(
    filters.ingredient
      ? { value: filters.ingredient, label: filters.ingredient }
      : null
  );

  function setFormFilters({ category, ingredient }: Filters) {
    if (category) {
      setFilters({ category, ingredient: null });
      setCategorySelect(category);
      setIngredientSelect(null);
    }

    if (ingredient) {
      setFilters({ category: null, ingredient: ingredient.value });
      setCategorySelect("");
      setIngredientSelect(ingredient);
    }
  }

  const showTextButton = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="form"
      maxW="100%"
      direction={["column", "row"]}
      border="1px solid white"
      align="center"
    >
      <Select
        placeholder="Category"
        border="0"
        borderRadius="0"
        value={categorySelect}
        onChange={(e) => {
          setFormFilters({ category: e.target.value, ingredient: null });
        }}
      >
        {categories &&
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </Select>

      <Text alignSelf={["flex-start", "center"]} mx="4" color="blue.500">
        or
      </Text>

      <CustomSelect
        placeholder="Select an ingredient"
        options={optionsIngredients}
        value={ingredientSelect}
        onChange={(option) => {
          const newValue = option as Option;
          setFormFilters({ category: null, ingredient: newValue });
        }}
      />

      <Button
        type="submit"
        w={["100%", "auto"]}
        mt={["4", "0"]}
        bg="gray.700"
        border="none"
        borderTop={["1px solid white", "0"]}
        borderRadius="0"
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        {showTextButton && <Text fontWeight="500">search</Text>}
        <Search2Icon color="gray.300" ml={showTextButton ? "2" : "0"} />
      </Button>
    </Flex>
  );
}
