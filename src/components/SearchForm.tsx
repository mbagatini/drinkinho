import { useState } from "react";
import { Box, Text, InputGroup, Input, Button, Select } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useCategories } from "../hooks/useCategories";

type FilterProps = {
  category: string | null;
  ingredient: string | null;
};

interface SearchProps {
  handleSearch: (filters: FilterProps) => void;
}

export function SearchForm({ handleSearch }: SearchProps) {
  const { data: categories } = useCategories();

  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  return (
    <Box as="form" w="100%">
      <InputGroup border="1px">
        <Select
          placeholder="Category"
          w="sm"
          border="0"
          borderRadius="0"
          onChange={(e) => {
            setCategory(e.target.value);
            setIngredient("");
          }}
          value={category}
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

        <Input
          type="text"
          placeholder="type an ingedient"
          border="0"
          borderRadius="0"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyDown={() => setCategory("")}
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
      </InputGroup>
    </Box>
  );
}
