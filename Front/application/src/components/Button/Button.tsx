import React from "react";
import styles from "./Button.module.scss";

interface Props {
  onClick: () => void;
  outlined?: boolean;
}

const Button = ({
  onClick,
  children,
  outlined,
}: React.PropsWithChildren<Props>) => {
  return (
    <button className={outlined ? styles.outlined : ""} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
