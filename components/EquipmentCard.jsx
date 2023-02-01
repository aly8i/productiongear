import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import img from "../public/Camera.jpg"

const EquipmentsCard = ({equipments}) => {
  const shorten =(str) =>{
    var result;
    if(str.length>=24)
      result = str.substring(0,24)
    else
      result = str
    return result
  }
  return (
    equipments.map((eq)=>(
      <Link key={eq._id} href={`/equipments/${eq._id}`} passHref>
        <div className={`${styles.card} ${styles.equ}`} >
          <h2>{eq.name}</h2>
          <Image src={eq.images[0] || img} alt="" width={100} height={100} className={styles.profileImg}/>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Category</p>
            <p className={styles.col2}>{eq.category||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>for</p>
            <p className={styles.col2}>{eq.forr||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Price</p>
            <p className={styles.col2}>{eq.price||"NAN"}{"$"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Warranty</p>
            <p className={styles.col2}>{eq.warranty?shorten(eq.warranty):"NAN"}</p>
          </div>
        </div>
      </Link>
    ))
  )
}

export default EquipmentsCard