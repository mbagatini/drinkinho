import { Button, Collapse, Heading, Text, VStack } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { CardList } from "../components/CardList";
import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { getDrinks } from "../hooks/useDrinks";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useFilters } from "../hooks/useFilters";

export default function Discover() {
  const [enableSearch, setEnableSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const { filters, setFilters, clearFilters } = useFilters();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
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

  const formattedData = useMemo(() => {
    if (!data?.pages[0].drinks) {
      return [];
    }

    return data?.pages.map((item) => item.drinks).flat();
  }, [data]);

  // INFINITE SCROLL
  const loadMoreRef = useRef(null);

  useIntersectionObserver({
    targetRef: loadMoreRef,
    onIntersect: fetchNextPage,
    enableCondition: !isFetchingNextPage,
  });

  // SEARCH
  function handleSearch() {
    if (!filters.category && !filters.ingredient) {
      setEnableSearch(false);
      clearFilters();
      remove();
      return;
    }

    const sanitazedFilters = filters.category
      ? { category: filters.category, ingredient: null }
      : { category: null, ingredient: filters.ingredient };

    setShowFilters(false);
    setFilters(sanitazedFilters);
    if (!enableSearch) setEnableSearch(true);
  }

  return (
    <VStack w="100vw" h="100vh">
      <Header />

      <VStack as="main" maxW={[390, 640, 768, 1280]} mx="auto" p={["8", "16"]}>
        <Heading maxW={640} mb="8" textAlign="center">
          SEARCH SOME DRINK BY CATEGORY OR INGREDIENT
        </Heading>
        <Collapse startingHeight="0" in={showFilters}>
          <VStack maxW={640} mx="auto" align="center" spacing="8">
            <Text w="70%" color="blue.500" textAlign="center">
              We show you the best options, you choose
            </Text>

            <SearchForm handleSearch={handleSearch} />
          </VStack>
        </Collapse>

        {!showFilters && (
          <Button
            size="sm"
            borderRadius="sm"
            mt="6"
            bg="orange.500"
            onClick={() => setShowFilters(!showFilters)}
          >
            Show filtrers
          </Button>
        )}

        <VStack maxW={[390, 640, 768, 1280]} pt="24">
          {isLoading && <Text>Loading...</Text>}

          {isError && <Text>Sorry, An error has occured</Text>}

          {isSuccess && <CardList cards={formattedData} />}

          {hasNextPage && (
            <Text ref={loadMoreRef} p="8" color="orange.500">
              {isFetchingNextPage ? "Loading more..." : ""}
            </Text>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
