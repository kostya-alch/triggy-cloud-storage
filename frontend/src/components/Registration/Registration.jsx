import React, { useState } from 'react'
import { registration } from '../../actions/user'
import Input from '../../utils/UI/input/Input'
import styles from './Registration.module.scss'


const Registration = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   return (
      <div className={styles.registration}>
         <div className={styles.header}>Регистрация</div>
         <Input value={email}
            setValue={setEmail}
            type='text'
            placeholder='Введите email' />
         <Input
            value={password}
            setValue={setPassword}
            type='password'
            placeholder='Введите пароль' />
         <button className={styles.btn}
            onClick={() => registration(email, password)}>Зарегистрироваться</button>
      </div>
   )
}

export default Registration
