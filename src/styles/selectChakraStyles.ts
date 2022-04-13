import { ChakraStylesConfig } from "chakra-react-select";

export const chakraStyles: ChakraStylesConfig = {
  input: (provided) => ({
    ...provided,
    minW: "160px",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    borderColor: "transparent",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white.100",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    borderColor: "transparent",
  }),
  inputContainer: (provided) => ({
    ...provided,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    w: "40px",
    bg: "none",
  }),
};
