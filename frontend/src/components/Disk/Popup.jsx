import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file'
import { setPopupActionCreator } from '../../reducers/fileReducer'
import Input from '../../utils/UI/input/Input'

import styles from './Popup.module.scss'

const Popup = () => {
   const [dirname, setDirname] = useState('')
   const popupDisplay = useSelector(state => state.files.popupDisplay)
   const currentDir = useSelector(state => state.files.currentDir)
   const dispatch = useDispatch()

   const createHandler = () => {
      dispatch(createDir(currentDir, dirname))
      setDirname('')
      dispatch(setPopupActionCreator('none'))
   }
   return (
      <div className={styles.popup}
         style={{ display: popupDisplay }}
         onClick={() => dispatch(setPopupActionCreator('none'))}>
         <div className={styles.content} onClick={(event) => event.stopPropagation()}>
            <div className={styles.header}>
               <div className={styles.title}>Создать новую папку</div>
               <button onClick={() => dispatch(setPopupActionCreator('none'))}
                  className={styles.close}>X</button>
            </div>
            <Input type='text'
               placeholder='Введите название папки'
               value={dirname}
               setValue={setDirname}
            />
            <button className={styles.create} onClick={() => createHandler()}>Создать</button>
         </div>
      </div>
   )
}

export default Popup
