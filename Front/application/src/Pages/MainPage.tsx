/* eslint-disable no-var */
import { useState } from "react";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const [inputLink, setInputLink] = useState<string>("");
  const [showIFrame, setShowIFrame] = useState<boolean>(false);

  const changeInputLink = (inputLink: string) => {
    setInputLink(inputLink);
  };

  const applyInputLink = async () => {
    // if (inputLink !== "" && inputLink) {
    await setShowIFrame(true);
    // }
  };

  const iframeContent =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById("iframe");
  console.log(iframeContent);

  //   console.log(iframeContent);

  //   http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=de&tl=bg

  //http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=pl&tl=de
  // 1. SOURCE
  // 2. DESTINATION

  //   const getPage = async () => {
  //     const result = await fetch(
  //       "http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=pl&tl=de",
  //       { mode: "no-cors" }
  //     );

  //     console.log(result);
  //   };
  //   useEffect(() => {
  //     getPage();
  //   }, []);

  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     {
  //       pageLanguage: "pl",
  //       includedLanguages: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  //   var a = document.querySelector("body");
  //   a.selectedIndex = 1;
  //   a.dispatchEvent(new Event("change"));
  // }

  return (
    <>
      <header className={styles.header}>Header</header>
      {showIFrame ? (
        <iframe
          id={"iframe"}
          height={"100%"}
          width={"100%"}
          src={`https://pl-reactjs-org.translate.goog/?_x_tr_sl=en&_x_tr_tl=de&_x_tr_hl=pl`}
        ></iframe>
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
      <footer>Nazywam się Michał. Pochodzę z dużego miasta.</footer>
    </>
  );
};

export default MainPage;
