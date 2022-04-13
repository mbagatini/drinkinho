import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
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

      <Text alignSelf={["flex-start", "center"]} mx="4" color="blue.500">
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
        w={["100%", "auto"]}
        mt={["4", "0"]}
        bg="gray.700"
        border="none"
        borderTop={["1px solid white", "0"]}
        borderRadius="0"
        onClick={(e) => {
          e.preventDefault();
          handleSearch({ category, ingredient });
        }}
      >
        {showTextButton && <Text fontWeight="500">search</Text>}
        <Search2Icon color="gray.300" ml={showTextButton ? "2" : "0"} />
      </Button>
    </Flex>
  );
}
