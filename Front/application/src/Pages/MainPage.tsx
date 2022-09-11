/* eslint-disable react/no-unknown-property */
/* eslint-disable no-var */
import { useState } from "react";
import styles from "./MainPage.module.scss";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import SelectField from "../components/SelectField/SelectField";
import Spinner from "../components/Spinner/Spinner";

const languageOptions = [
  { value: "de", label: "Deutch" },
  { value: "fr", label: "France" },
  { value: "nl", label: "Dutch" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
];

const MainPage = () => {
  const [inputLink, setInputLink] = useState<string>("");
  const [language, setLanguage] = useState<string>("de");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      .then(() => {
        setLoading(false);
        const replaceString = inputLink.replace(/[^a-zA-Z0-9 ]/g, "");
        const finalString = `https://translated-images.s3.eu-central-1.amazonaws.com/${replaceString}/${replaceString}_${language}.png`;
        setText(finalString);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const updateLanguage = (value: string) => {
    setLanguage(value);
    setText((oldText) => oldText.slice(0, -6).concat(`${value}.png`));
  };

  return (
    <>
      <header className={styles.header}>Image Translator</header>
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
              onChange={(value) => updateLanguage(value ? value : "de")}
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
