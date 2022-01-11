import React from 'react'
import { useSelector } from 'react-redux'
import File from '../File/File'
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from './FileList.module.scss'

const FileList = () => {

   const files = useSelector(state => state.files.files)

   if (files.length === 0) {
      return (<div className={styles.warning_files}>Файлы не найдены!</div>)
   }
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
         <TransitionGroup>
            {files.map(file =>
               <CSSTransition
                  key={file._id}
                  timeout={500}
                  classNames={'file'}
                  exit={false}
               >
                  <File file={file} />
               </CSSTransition>
            )}
         </TransitionGroup>
      </div>
   )
}

export default FileList
