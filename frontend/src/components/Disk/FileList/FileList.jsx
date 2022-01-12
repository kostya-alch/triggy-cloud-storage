import React from 'react'
import { useSelector } from 'react-redux'
import File from '../File/File'
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from './FileList.module.scss'

const FileList = () => {

   const files = useSelector(state => state.files.files) // вытянули состояние из редьюсера
   const fileView = useSelector(state => state.app.view)

   if (files.length === 0) { // условие если файлы не найдены
      return (<div className={styles.warning_files}>Файлы не найдены!</div>)
   }
   if (fileView === 'plate') {
      return (
         <div className={styles.file_plate}>
            {files.map(file =>
               <File key={file._id} file={file} />
            )}
         </div>
      )
   }

   if (fileView === 'list') {
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
            {/* библиотечка для анимаций */}
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

}

export default FileList
