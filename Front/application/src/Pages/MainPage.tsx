/* eslint-disable react/no-unknown-property */
/* eslint-disable no-var */
import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import axios from "axios";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import SelectField from "../components/SelectField/SelectField";
import Spinner from "../components/Spinner/Spinner";

const languageOptions = [
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "nl", label: "Dutch" },
  { value: "de", label: "Deutch" },
  { value: "it", label: "Italian" },
];

const MainPage = () => {
  const [inputLink, setInputLink] = useState<string>("");
  const [language, setLanguage] = useState<string | undefined>("");
  const [showIFrame, setShowIFrame] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [html, setHtml] = useState<any>({ __html: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const applyInputLink = async () => {
  //   // if (inputLink !== "" && inputLink) {
  //   await setShowIFrame(true);
  //   getPage();

  //   // }
  // };

  // const iframeContent =
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   document.getElementById("iframe");
  // console.log(iframeContent);

  //   console.log(iframeContent);

  //   http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=de&tl=bg

  //http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=pl&tl=de
  // 1. SOURCE
  // 2. DESTINATION

  // const getPage = () => {
  //   fetch(
  //     "http://translate.google.com/translate?hl=bg&ie=UTF-8&u=https://pl.reactjs.org/&sl=pl&tl=de",
  //     { method: "GET", mode: "no-cors" }
  //   )
  //     .then((response) => response.text())
  //     .then((text) => setHtml({ __html: text }));
  // };

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

  // const fetchAsBlob = (url: RequestInfo | URL) =>
  //   fetch(url, { mode: "no-cors" }).then((response) => response.blob());

  // const convertBlobToBase64 = (blob: Blob) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   });
  //STONOGA
  // https://i.ytimg.com/vi/oj0izftQFfQ/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA6zpvjQ7LWst_uRiwb7vmj_WmhDg

  const getImage = () => {
    setError(false);
    setLoading(true);
    fetch(
      `https://kemxekil1f.execute-api.eu-central-1.amazonaws.com/dev/translate?url=${inputLink}`,
      {
        method: "GET",
      }
    )
      .then((request) => {
        return request.json();
      })
      .then((text) => {
        setText(text.image);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <header className={styles.header}>Image Translator</header>
      {html && <div dangerouslySetInnerHTML={html} />}
      <main className={styles.main}>
        {loading && <Spinner />}
        {error && (
          <span className={styles.error}>Oops! Something went wrong :(</span>
        )}
        {text && (
          <>
            <SelectField
              options={languageOptions}
              value={language}
              onChange={setLanguage}
              placeholder="Choose language"
            />
            <img src={text} />
          </>
        )}
        <div className={styles.inputsWrapper}>
          <InputField
            value={inputLink}
            onChange={setInputLink}
            placeholder="Paste your image URL here"
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={() => {
              setInputLink("");
              setText("");
            }}
            outlined
          >
            Clear
          </Button>
          <Button onClick={getImage}>Translate</Button>
        </div>
      </main>
    </>
  );
};

export default MainPage;
