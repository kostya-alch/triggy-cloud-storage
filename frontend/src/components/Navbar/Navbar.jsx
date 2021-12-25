import React from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutActionCreator } from '../../reducers/userReducer'
const Navbar = () => {
   const isAuth = useSelector(state => state.user.isAuth)
   const dispatch = useDispatch()
   return (
      <div className={styles.navbar}>
         <div className={styles.container}>
            <img src={Logo} alt="Site Logo" className={styles.logo} />
            <div className={styles.header}>TRIGGY CLOUD</div>
            {!isAuth && <div className={styles.login}><NavLink style={{ textDecoration: 'none' }} to="/login">Войти</NavLink></div>}
            {!isAuth && <div className={styles.registration}><NavLink style={{ textDecoration: 'none' }} to="/registration">Регистрация</NavLink></div>}
            {isAuth && <div className={styles.login} onClick={() => dispatch(logoutActionCreator())}>Выйти</div>}
         </div>
      </div >
   )
}

export default Navbar
