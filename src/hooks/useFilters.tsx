import { createContext, useContext, useState } from "react";

// Interface do context
type Filter = {
  category: string | null;
  ingredient: string | null;
};

interface FiltersContextData {
  filters: Filter;
  setFilters: (filters: Filter) => void;
  clearFilters: () => void;
}

// Context
const FiltersContext = createContext<FiltersContextData>(
  {} as FiltersContextData
);

// Provider
export const FiltersProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<Filter>({
    category: null,
    ingredient: null,
  });

  const clearFilters = () => {
    setFilters({
      category: null,
      ingredient: null,
    });
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

// Hook
export const useFilters = () => useContext(FiltersContext);
