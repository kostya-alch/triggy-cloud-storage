import React, { useState } from 'react'
import Input from '../../utils/UI/input/Input'
import styles from './Login.module.scss'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/user'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   return (
      <div className={styles.auth}>
         <div className={styles.header}>Авторизация</div>
         <Input
            value={email}
            setValue={setEmail}
            type='text'
            placeholder='Введите email' />
         <Input
            value={password}
            setValue={setPassword}
            type='password'
            placeholder='Введите пароль' />
         <button className={styles.btn}
            onClick={() => dispatch(login(email, password))}>Войти</button>
      </div>
   )
}

export default Login
