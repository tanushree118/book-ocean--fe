import React from "react";
import Header from "./header";
import Content from "./content";
import styles from "./main-page.module.scss";
import { useSelector } from "react-redux";

const MainPage = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  return (
    <div className={styles.mainPage}>
      <Header loggedInUser={loggedInUser} />
      <Content loggedInUser={loggedInUser} />
    </div>
  );
};
export default MainPage;
