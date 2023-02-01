import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect,useState } from 'react'

const TalentCard = ({users}) => {
  const shorten =(str) =>{
    var result;
    if(str.length>=60)
      result = str.substring(0,60)+"...";
    else
      result = str
    return result
  }
  return (
    users.map((user)=>(
      <Link href={`/users/${user._id}`} key={user._id} passHref>
        <div className={`${styles.card} ${styles.user}`} >
          <Image className={styles.profileImg} width={180} height={180} src={user.image} alt=""/>
          <h2>{user.fullname}</h2>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Phone Number</p>
            <p className={styles.col2}>{user.phonenumber||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Eduction Level</p>
            <p className={styles.col2}>{user.education?.eductionlevel||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Field of Study</p>
            <p className={styles.col2}>{user.education?.fieldofstudy ||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Graduation year</p>
            <p className={styles.col2}>{user.education?.graduationyear ||"NAN"}</p>
          </div>
        </div>
      </Link>
    ))
  )
}

export default TalentCard