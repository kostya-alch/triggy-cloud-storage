import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUploadActionCreator } from '../../reducers/uploadReducer'

import styles from './Uploader.module.scss'

const UploadFile = ({ file }) => {
   const dispatch = useDispatch()

   return (
      <div className={styles.upload_file}>
         <div className={styles.upload_header}>
            <div className={styles.upload_name}>
               {file.name}
            </div>
            <button className={styles.remove} 
            onClick={() => dispatch(removeUploadActionCreator(file.id))}>X</button>
         </div>
         <div className={styles.upload_progress_bar}>
            <div className={styles.upload_bar} 
            style={{ width: file.progress + "%" }}></div>
            <div className={styles.upload_percent}>{file.progress}%</div>
         </div>
      </div>
   )
}

export default UploadFile
