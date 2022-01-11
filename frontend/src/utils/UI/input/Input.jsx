import React from 'react'
import './Input.module.scss'

const Input = (props) => {
   return (
      <input
         value={props.value}
         onChange={(e) => props.setValue(e.target.value)}
         type={props.type}
         placeholder={props.placeholder} />
   )
}

export default Input
