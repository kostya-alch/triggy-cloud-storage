import React from 'react'
import dirLogo from '../../../assets/img/file.svg'
import fileLogo from '../../../assets/img/img.svg'

import styles from './File.module.scss'

const File = ({ file }) => {
   return (
      <div className={styles.file}>
         <img src={file.type === 'dir' ? dirLogo : fileLogo}
            alt="File" className={styles.img} />
         <div className={styles.name}>{file.name}</div>
         <div className={styles.date}>{file.date.slice(0, 10)}</div>
         <div className={styles.size}>{file.size}</div>
      </div>
   )
}

export default File
