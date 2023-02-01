import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
const EmployeerCard = ({users}) => {
  const shorten =(str) =>{
    var result;
    if(str.length>=89)
      result = str.substring(0,86)+"...";
    else
      result = str
    return result
  }
  return (
    users.map((user)=>(
      <Link key={user._id} href={`/users/${user._id}`} passHref>
        <div className={`${styles.card} ${styles.user}`}>
          <h2>{user.fullname}</h2>
            <Image src={user.image} alt="" width={100} height={100} className={styles.profileImg}/>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Country</p>
            <p className={styles.col2}>{user.address?.country||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Years of Experience</p>
            <p className={styles.col2}>{user.yearsofexperience||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Education Level</p>
            <p className={styles.col2}>{user.education?.educationlevel||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Graduation Year</p>
            <p className={styles.col2}>{user.education?.graduationyear||"NAN"}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Field of Study</p>
            <p className={styles.col2}>{user.education?.fieldofstudy||"NAN"}</p>
          </div>
          <div className={styles.section}>
            <p className={styles.col11}>About</p>
            <p className={styles.col22}>{user.about?shorten(user.about):"NAN"}</p>
          </div>
        </div>
      </Link>
    ))
  )
}

export default EmployeerCard