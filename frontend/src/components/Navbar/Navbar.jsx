import React from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
   return (

      <div className={styles.navbar}>
         <div className={styles.container}>
            <img src={Logo} alt="Site Logo" className={styles.logo} />
            <div className={styles.header}>TRIGGY CLOUD</div>
            <div className={styles.login}><NavLink to="/login">Войти</NavLink></div>
            <div className={styles.registration}><NavLink to="/registration">Регистрация</NavLink></div>
         </div>
      </div>
   )
}

export default Navbar
