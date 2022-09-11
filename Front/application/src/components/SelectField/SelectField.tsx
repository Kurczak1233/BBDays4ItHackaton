import Select from "react-select";
import { customSelectFieldStyles } from "./customSelectFieldStyles";

interface Props {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
}

const SelectField = ({ options, value, onChange, placeholder }: Props) => {
  return (
    <Select
      options={options}
      value={options.filter((option) => value === option.value)}
      onChange={(option) => onChange(option?.value)}
      placeholder={placeholder ?? ""}
      styles={customSelectFieldStyles}
    />
  );
};

export default SelectField;
