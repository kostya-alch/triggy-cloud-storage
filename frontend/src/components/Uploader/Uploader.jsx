import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploadActionCreator } from '../../reducers/uploadReducer'
import styles from './Uploader.module.scss'
import UploadFile from './UploadFile'

const Uploader = () => {
   const isVisible = useSelector(state => state.upload.isVisible)
   const files = useSelector(state => state.upload.files)
   const dispatch = useDispatch()

   return (isVisible &&
      <div className={styles.uploader}>
         <div className={styles.header}>
            <div className={styles.title}>Загрузки</div>
            <button className={styles.close}
               onClick={() => dispatch(hideUploadActionCreator())}>X</button>
         </div>
         {files.map(file =>
            <UploadFile key={file.id} file={file} />
         )}
      </div>
   )
}

export default Uploader
