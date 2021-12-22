import React from 'react';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';


const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.wrap}>
          <Switch>
            <Route path='/registration' component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
