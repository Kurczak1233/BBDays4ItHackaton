import styles from "./InputField.module.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField = ({ value, onChange, placeholder }: Props) => {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder={placeholder ?? ""}
    />
  );
};

export default InputField;
