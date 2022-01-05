import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dirLogo from '../../../assets/img/file.svg'
import fileLogo from '../../../assets/img/img.svg'
import { currentDirActionCreator, pushToStackActionCreator } from '../../../reducers/fileReducer'

import styles from './File.module.scss'

const File = ({ file }) => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)

   const openDirHandler = (file) => {
      if (file.type === 'dir') {
         dispatch(pushToStackActionCreator(currentDir))
         dispatch(currentDirActionCreator(file._id))
      }
   }

   return (
      <div className={styles.file} onClick={() => openDirHandler(file)}>
         <img src={file.type === 'dir' ? dirLogo : fileLogo}
            alt="File" className={styles.img} />
         <div className={styles.name}>{file.name}</div>
         <div className={styles.date}>{file.date.slice(0, 10)}</div>
         <div className={styles.size}>{file.size}</div>
      </div>
   )
}

export default File
