// components/Loader.tsx

import React from 'react';
import styles from './Loader.module.css'; // لینک دادن به استایل‌ها

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
