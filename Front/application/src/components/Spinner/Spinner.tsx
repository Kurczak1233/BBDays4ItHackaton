import FadeLoader from "react-spinners/FadeLoader";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <FadeLoader color="#3C967D" />
    </div>
  );
};

export default Spinner;
