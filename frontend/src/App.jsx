import React from 'react';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';


const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.wrap}>
          {
            !isAuth && <Switch>
              <Route path='/registration' component={Registration} />
              <Route path='/login' component={Login} />
            </Switch>
          }

        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
