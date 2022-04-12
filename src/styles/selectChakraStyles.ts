import { ChakraStylesConfig } from "chakra-react-select";

export const chakraStyles: ChakraStylesConfig = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    borderColor: "transparent",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    borderColor: "transparent",
  }),
  inputContainer: (provided) => ({
    ...provided,
    w: "200px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    w: "40px",
    bg: "none",
  }),
};
