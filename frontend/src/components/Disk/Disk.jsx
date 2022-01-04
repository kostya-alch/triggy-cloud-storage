import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'
import { currentDirActionCreator, setPopupActionCreator } from '../../reducers/fileReducer'

import styles from './Disk.module.scss'
import FileList from './FileList/FileList'
import Popup from './Popup'

const Disk = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const dirStack = useSelector(state => state.files.dirStack)

   useEffect(() => {
      dispatch(getFiles(currentDir))
   }, [currentDir, dispatch])

   const showPopupHandler = () => {
      dispatch(setPopupActionCreator('flex'))
   }
   const backClickHandler = () => {
      const backDirId = dirStack.pop()
      dispatch(currentDirActionCreator(backDirId))
   }
   return (
      <div className={styles.disk}>
         <div className={styles.btns}>
            {currentDir && <button className={styles.disk_back} onClick={() => backClickHandler()}>Назад</button>}
            <button className={styles.disk_create} onClick={() => showPopupHandler()}>Создать папку</button>
         </div>
         <FileList />
         <Popup />
      </div>
   )
}

export default Disk
