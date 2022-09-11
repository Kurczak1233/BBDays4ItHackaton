import styles from "./SelectField.module.scss";

interface Props {
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectField = ({ options, onChange, placeholder }: Props) => {
  return (
    <select
      className={styles.select}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option hidden>{placeholder}</option>}
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
