import React from 'react'
import styles from "../styles/Error.module.scss"
const Error = ({error,setError}) => {
  return (
    <div className={`${styles.body} ${styles.main}`}>
        <div className={`${error==""?styles.ds:styles.popupVisible} ${styles.popup} ${styles.popupIcon} ${styles.error} ${styles.jsErrorPopup}`}>
        <div class={styles.popupBackground}></div>
        <div class={styles.popupContent}>
            <h3 class={styles.popupContentTitle}>Error</h3>
            <p>{error}</p>
            <p><div onClick={()=>setError("")}className={`${styles.button} ${styles.buttonError}`}>Okay</div></p>
        </div>
        </div>
    </div>
  )
}

export default Error