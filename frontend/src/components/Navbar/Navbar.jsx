import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import Logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutActionCreator } from '../../reducers/userReducer'
import { getFiles, searchFile } from '../../actions/file'
import { showLoaderActionCreator } from '../../reducers/appReducer'
const Navbar = () => {
   const isAuth = useSelector(state => state.user.isAuth)
   const currentDir = useSelector(state => state.files.currentDir)
   const dispatch = useDispatch()
   const [searchName, setSearchName] = useState('')
   const [searchTimeout, setSearchTimeout] = useState(false)

   const searchNameHandler = (event) => {
      setSearchName(event.target.value)
      if (searchTimeout !== false) {
         clearTimeout(searchTimeout)
      }
      dispatch(showLoaderActionCreator())
      if (event.target.value !== '') {
         setSearchTimeout(setTimeout(() => {
            dispatch(searchFile(event.target.value))
         }, 500))
      } else {
         dispatch(getFiles(currentDir))
      }
      // каждый раз когда мы очищаем инпут, у нас очищается таймаут 
      // и запрос на сервер улетает один раз, если в инпут больше ничего не ввели

   }
   return (
      <div className={styles.navbar}>
         <div className={styles.container}>
            <img src={Logo} alt="Site Logo" className={styles.logo} />
            <div className={styles.header}>TRIGGY CLOUD</div>
            {isAuth &&
               <input
                  value={searchName}
                  onChange={(event) => searchNameHandler(event)}
                  type='text'
                  className={styles.search_file}
                  placeholder='Поиск по файлам' />}
            {!isAuth &&
               <div className={styles.login}><NavLink style={{ textDecoration: 'none' }} to="/login">Войти</NavLink></div>}
            {!isAuth
               && <div className={styles.registration}><NavLink style={{ textDecoration: 'none' }} to="/registration">Регистрация</NavLink></div>}
            {isAuth
               && <div className={styles.login} onClick={() => dispatch(logoutActionCreator())}>Выйти</div>}
         </div>
      </div >
   )
}

export default Navbar
