import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { OptionBase, Select as ChakraReactSelect } from "chakra-react-select";

import { useCategories } from "../hooks/useCategories";
import { useIngredients } from "../hooks/useIngredients";
import { chakraStyles } from "../styles/selectChakraStyles";

type FilterProps = {
  category: string | null;
  ingredient: string | null;
};

interface Option extends OptionBase {
  value: string;
  label: string;
}

interface SearchProps {
  handleSearch: (filters: FilterProps) => void;
}

export function SearchForm({ handleSearch }: SearchProps) {
  const { data: categories } = useCategories();
  const { data: ingredients } = useIngredients();

  const optionsIngredients =
    ingredients?.map((item) => {
      return { value: item, label: item };
    }) ?? [];

  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [ingredientSelect, setIngredientSelect] = useState<Option | null>(null);

  function updateIngredientSelect(item: Option | null) {
    setIngredientSelect(item);
    setIngredient(item ? item.value : "");
  }

  return (
    <Flex as="form" w="100%" border="1px solid white" align="center">
      <Select
        placeholder="Category"
        w="sm"
        border="0"
        borderRadius="0"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          updateIngredientSelect(null);
        }}
      >
        {categories &&
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </Select>

      <Text alignSelf="center" mx="4">
        or
      </Text>

      <ChakraReactSelect
        placeholder="Select an ingredient"
        chakraStyles={chakraStyles}
        options={optionsIngredients}
        value={ingredientSelect}
        onChange={(option) => {
          const newValue = option as Option;
          updateIngredientSelect(newValue);
          setCategory("");
        }}
      />

      <Button
        type="submit"
        bg="none"
        border="0"
        borderRadius="0"
        onClick={(e) => {
          e.preventDefault();
          handleSearch({ category, ingredient });
        }}
      >
        <Search2Icon color="gray.300" />
      </Button>
    </Flex>
  );
}
