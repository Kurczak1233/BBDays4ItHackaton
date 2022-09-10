import React from "react";
import styles from "./App.module.scss";
import MainPage from "./Pages/MainPage";

export interface IPresent {
  value: number;
  content: string;
}

function App() {
  return (
    <div className={styles.applicationWrapper}>
      <MainPage />
    </div>
  );
}

export default App;
