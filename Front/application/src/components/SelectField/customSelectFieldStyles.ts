import { StylesConfig } from "react-select";

export const customSelectFieldStyles: StylesConfig<
  { value: string; label: string },
  false
> = {
  control: (provided) => ({
    ...provided,
    height: "40px",
    borderColor: "#fff",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#fff",
    },
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.hasValue ? "#696B72" : "#BFC0C4",
    "&:hover": {
      color: "#696B72",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#BFC0C4",
    fontSize: "x-large",
  }),
  input: (provided) => ({
    ...provided,
    fontSize: "x-large",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "x-large",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "x-large",
    color: state.isSelected ? "#fff" : "",
    backgroundColor: state.isSelected ? "#3c967d" : "#fff",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3c967d" : "#ebf4f2",
      cursor: "pointer",
    },
  }),
};
