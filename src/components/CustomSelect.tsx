/* eslint-disable react/display-name */
import { forwardRef } from "react";
import type { MutableRefObject } from "react";
import {
  SelectComponent,
  SelectInstance,
  Props,
  GroupBase,
  Select,
} from "chakra-react-select";

import { chakraStyles } from "../styles/selectChakraStyles";

export const CustomSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    // I couldn't solve the type here, so I'm just going to ignore the types
    props: any, //Props<Option, IsMulti, Group>,
    ref:
      | ((instance: SelectInstance<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<SelectInstance<Option, IsMulti, Group> | null>
      | null
  ) => {
    return <Select ref={ref} {...props} chakraStyles={chakraStyles} />;
  }
) as SelectComponent;
