import { useState } from "react";
import styles from "./MainPage.module.scss";
import { createPortal } from "react-dom";
import { IFrame } from "../components/IFrame/IFrame";

const MainPage = () => {
  const [inputLink, setInputLink] = useState<string>("");
  const [showIFrame, setShowIFrame] = useState<boolean>(false);

  const changeInputLink = (inputLink: string) => {
    setInputLink(inputLink);
  };

  const applyInputLink = () => {
    if (inputLink !== "" && inputLink) {
      setShowIFrame(true);
    }
  };

  return (
    <>
      <header className={styles.header}>Header</header>
      {showIFrame ? (
        <iframe height={"100%"} width={"100%"} src={inputLink}></iframe>
      ) : (
        <main className={styles.main}>
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={inputLink}
              className={styles.input}
              placeholder={"Type some link here..."}
              onChange={(event) => changeInputLink(event.currentTarget.value)}
            />
          </div>
          <div
            className={styles.confirmButton}
            onClick={() => applyInputLink()}
          >
            Translate
          </div>
        </main>
      )}
      <footer>Footer</footer>
    </>
  );
};

export default MainPage;
