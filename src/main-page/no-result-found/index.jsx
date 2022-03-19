import React from "react";
import styles from "../main-page.module.scss";
const NoResultFoundModal = () => {
  return (
    <div className={styles.noResultFound}>
      <span>No results found</span>
    </div>
  );
};

export default NoResultFoundModal;
