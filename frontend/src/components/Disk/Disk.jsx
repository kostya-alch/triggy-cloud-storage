import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../../actions/file'
import { setPopupActionCreator } from '../../reducers/fileReducer'

import styles from './Disk.module.scss'
import FileList from './FileList/FileList'
import Popup from './Popup'

const Disk = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)

   useEffect(() => {
      dispatch(getFiles(currentDir))
   }, [currentDir, dispatch])

   const showPopupHandler = () => {
      dispatch(setPopupActionCreator('flex'))
   }
   return (
      <div className={styles.disk}>
         <div className={styles.btns}>
            <button className={styles.disk_back}>Назад</button>
            <button className={styles.disk_create} onClick={() => showPopupHandler()}>Создать папку</button>
         </div>
         <FileList />
         <Popup />
      </div>
   )
}

export default Disk
