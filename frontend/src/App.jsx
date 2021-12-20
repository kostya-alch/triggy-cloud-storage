import React from 'react';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.scss'


const App = () => {
  return <div className={styles.app}>
    <Navbar />
  </div>;
};

export default App;
