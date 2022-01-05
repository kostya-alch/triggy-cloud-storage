import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dirLogo from '../../../assets/img/file.svg'
import fileLogo from '../../../assets/img/img.svg'
import { currentDirActionCreator, pushToStackActionCreator } from '../../../reducers/fileReducer'
import downloadBtn from '../../../assets/img/download.svg'
import deleteBtn from '../../../assets/img/delete.svg'

import styles from './File.module.scss'
import { deleteFile, downloadFile } from '../../../actions/file'

const File = ({ file }) => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)

   const openDirHandler = (file) => {
      if (file.type === 'dir') {
         dispatch(pushToStackActionCreator(currentDir))
         dispatch(currentDirActionCreator(file._id))
      }
   }

   const downloadClickHandler = (event) => {
      event.stopPropagation()
      downloadFile(file)
   }
   const deleteClickHandler = (event) => {
      event.stopPropagation()
      dispatch(deleteFile(file))
   }
   return (
      <div className={styles.file} onClick={() => openDirHandler(file)}>
         <img src={file.type === 'dir' ? dirLogo : fileLogo}
            alt="File" className={styles.img} />
         <div className={styles.name}>{file.name}</div>
         <div className={styles.date}>{file.date.slice(0, 10)}</div>
         <div className={styles.size}>{file.size}</div>
         {file.type !== 'dir' && <button onClick={(event) => downloadClickHandler(event)} className={[styles.btn, styles.download].join(' ')}>
            <img src={downloadBtn} alt="Скачать" />
         </button>}
         <button className={[styles.btn, styles.delete].join(' ')} onClick={(event) => deleteClickHandler(event)}>
            <img src={deleteBtn} alt="Удалить" />
         </button>
      </div>
   )
}

export default File
