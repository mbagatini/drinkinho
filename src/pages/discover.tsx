import { useMemo, useRef, useState } from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { CardList } from "../components/CardList";
import { getDrinks } from "../hooks/useDrinks";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

type FilterProps = {
  category: string | null;
  ingredient: string | null;
};

export default function Discover() {
  const [enableSearch, setEnableSearch] = useState(false);
  const [filters, setFilters] = useState<FilterProps>({} as FilterProps);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    remove,
  } = useInfiniteQuery(
    // query key
    ["drinks", filters],
    // request
    ({ pageParam = 1 }) => getDrinks(pageParam, filters),
    // get and return next page
    {
      enabled: enableSearch,
      getNextPageParam: (page) =>
        page.currentPage === page.lastPage ? null : page.currentPage + 1,
    }
  );

  console.log(data);
  const formattedData = useMemo(() => {
    return data?.pages.map((item) => item.drinks).flat() ?? [];
  }, [data]);

  // INFINITE SCROLL
  const loadMoreRef = useRef(null);

  useIntersectionObserver({
    targetRef: loadMoreRef,
    onIntersect: fetchNextPage,
    enableCondition: !isFetchingNextPage,
  });

  // SEARCH
  function handleSearch(filters: FilterProps) {
    if (!filters.category && !filters.ingredient) {
      setEnableSearch(false);
      remove();
      return;
    }

    const sanitazedFilters = filters.category
      ? { category: filters.category, ingredient: null }
      : { category: null, ingredient: filters.ingredient };

    setFilters(sanitazedFilters);
    setEnableSearch(true);
  }

  return (
    <VStack w="100vw" h="100vh">
      <Header />

      <VStack
        as="main"
        maxW={[640, 640, 860]}
        mx="auto"
        p={["8", "16"]}
        align="center"
        spacing="8"
      >
        <Heading textAlign="center">
          SEARCH SOME DRINK BY CATEGORY OR INGREDIENT
        </Heading>

        <Text color="blue.500">
          We will show you the best options, you choose
        </Text>

        <SearchForm handleSearch={handleSearch} />
      </VStack>

      <VStack as="main" maxW={[640, 768, 1280]} p={["8", "16"]}>
        {isLoading && <Text>Loading...</Text>}
        {isError && <Text>An error has occured: {error.message}</Text>}

        {isSuccess && <CardList cards={formattedData} />}

        {hasNextPage && (
          <Box ref={loadMoreRef}>
            {isFetchingNextPage ? "Loading more..." : ""}
          </Box>
        )}
      </VStack>
    </VStack>
  );
}
