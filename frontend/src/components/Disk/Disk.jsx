import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'

import styles from './Disk.module.scss'
import FileList from './FileList/FileList'

const Disk = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)

   useEffect(() => {
      dispatch(getFiles(currentDir))
   }, [currentDir])

   return (
      <div className={styles.disk}>
         <div className={styles.btns}>
            <button className={styles.disk_back}>Назад</button>
            <button className={styles.disk_create}>Создать папку</button>
         </div>
         <FileList />
      </div>
   )
}

export default Disk
