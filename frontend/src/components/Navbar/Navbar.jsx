import React from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo.svg'
const Navbar = () => {
   return (

      <div className={styles.navbar}>
         <div className={styles.container}>
            <img src={Logo} alt="Site Logo" className={styles.logo} />
            <div className={styles.header}>TRIGGY CLOUD</div>
            <div className={styles.login}>Войти</div>
            <div className={styles.registration}>Регистрация</div>
         </div>
      </div>
   )
}

export default Navbar
