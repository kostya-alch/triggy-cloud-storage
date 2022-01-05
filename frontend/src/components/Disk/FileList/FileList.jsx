import React from 'react'
import { useSelector } from 'react-redux'
import File from '../File/File'

import styles from './FileList.module.scss'
const FileList = () => {

   const files = useSelector(state => state.files.files)
      .map(file => <File key={file.id} file={file} />)
   return (
      <div className={styles.filelist}>
         <div className={styles.header}>
            <div className={styles.name}>
               Название
            </div>
            <div className={styles.date}>
               Дата
            </div>
            <div className={styles.size}>
               Размер
            </div>
         </div>
         {files}
      </div>
   )
}

export default FileList
