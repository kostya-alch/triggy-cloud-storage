import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dirLogo from '../../../assets/img/file.png'
import fileLogo from '../../../assets/img/document.png'
import { currentDirActionCreator, pushToStackActionCreator } from '../../../reducers/fileReducer'
import downloadBtn from '../../../assets/img/download.svg'
import deleteBtn from '../../../assets/img/delete.svg'

import styles from './File.module.scss'
import { deleteFile, downloadFile } from '../../../actions/file'
import sizeFormator from '../../../utils/sizeFormator'

const File = ({ file }) => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const fileView = useSelector(state => state.app.view)

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

   if (fileView === 'list') {
      return (
         <div className={styles.file}
            onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt="File"
               className={styles.img} />
            <div className={styles.name}>{file.name}</div>
            <div className={styles.date}>{file.date.slice(0, 10)}</div>
            <div className={styles.size}>{sizeFormator(file.size)}</div>
            {file.type !== 'dir' &&
               <button
                  onClick={(event) => downloadClickHandler(event)}
                  className={[styles.btn, styles.download].join(' ')}>
                  <img src={downloadBtn} alt="Скачать" />
               </button>}
            <button
               className={[styles.btn, styles.delete].join(' ')}
               onClick={(event) => deleteClickHandler(event)}>
               <img src={deleteBtn} alt="Удалить" />
            </button>
         </div>
      )
   }

   if (fileView === 'plate') {
      return (
         <div className={styles.file_plate}
            onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt="File"
               className={styles.img_plate} />
            <div className={styles.name_plate}>{file.name}</div>
            <div className={styles.btn_plate}>
               {file.type !== 'dir' &&
                  <button
                     onClick={(event) => downloadClickHandler(event)}
                     className={[styles.btn_plate, styles.download_plate].join(' ')}>
                     <img src={downloadBtn} alt="Скачать" />
                  </button>}
               <button
                  className={[styles.btn_plate, styles.delete_plate].join(' ')}
                  onClick={(event) => deleteClickHandler(event)}>
                  <img src={deleteBtn} alt="Удалить" />
               </button>
            </div>
         </div>
      )
   }

}

export default File
