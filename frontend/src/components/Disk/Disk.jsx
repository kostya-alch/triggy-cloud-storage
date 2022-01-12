import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { setViewActionCreator } from '../../reducers/appReducer'
import { currentDirActionCreator, setPopupActionCreator } from '../../reducers/fileReducer'
import Uploader from '../Uploader/Uploader'

import styles from './Disk.module.scss'
import FileList from './FileList/FileList'
import Popup from './Popup'

const Disk = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir) // вытащили состояние из редьюсера
   const dirStack = useSelector(state => state.files.dirStack) // вытащили состояние из редьюсера
   const loader = useSelector(state => state.app.loader)  // вытащили состояние из редьюсера
   const [dragEnter, setDragEnter] = useState(false) // состояние драг-дропа
   const [sort, setSort] = useState('type') // состояние выбора сортировки

   useEffect(() => {
      dispatch(getFiles(currentDir, sort))
   }, [currentDir, dispatch, sort])
   // каждый раз подтягивает на страницу файлы, если 
   // изменилась директория или сортировка
   const showPopupHandler = () => {
      dispatch(setPopupActionCreator('flex'))
   }
   const backClickHandler = () => {
      const backDirId = dirStack.pop()
      dispatch(currentDirActionCreator(backDirId))
   } // обработчик кнопки назад

   const fileUploadHandler = (event) => {
      const files = [...event.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
   }
   // обработчики драг-дропа
   const dragEnterHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      setDragEnter(true)
   }

   const dragLeaveHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      setDragEnter(false)
   }

   const dragOverHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      setDragEnter(true)
   }

   const dropHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      let files = [...event.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDragEnter(false)
   }
   // обработчики драг-дропа

   if (loader) { // условие показа лоадера
      return (
         <div className={styles.loader}>
            <div className={styles.lds_ripple}><div></div><div></div></div>
         </div>
      )
   }
   return (!dragEnter ?
      <div className={styles.disk}
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragOverHandler}>
         <div className={styles.btns}>
            {currentDir && <button className={styles.disk_back} onClick={() => backClickHandler()}>Назад</button>}
            <button className={styles.disk_create} onClick={() => showPopupHandler()}>Создать папку</button>
            <div className={styles.upload}>
               <label htmlFor="disk_upload-label" className={styles.upload_label}>Загрузить файл</label>
               <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id='disk_upload-label' className={styles.input_upload} />
            </div>
            <select
               value={sort}
               onChange={(e) => setSort(e.target.value)}
               className={styles.select}>
               <option value="name">По имени</option>
               <option value="type">По типу</option>
               <option value="date">По дате</option>
            </select>
            <button className={styles.plate} onClick={() => dispatch(setViewActionCreator('plate'))} />
            <button className={styles.list} onClick={() => dispatch(setViewActionCreator('list'))} />
         </div>
         <FileList />
         <Popup />
         <Uploader />
      </div>
      :
      <div className={styles.drop_area}
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragOverHandler}
         onDrop={dropHandler}>
         Перетащите файлы сюда
      </div>
   )
}

export default Disk
