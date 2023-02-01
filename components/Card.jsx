import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
const card = ({jobs}) => {
const shorten =(str) =>{
  var result;
  if(str.length>=89)
    result = str.substring(0,86)+"...";
  else
    result = str
  return result
}
  return (
    jobs.map((job)=>(
      <Link key={job._id} href={`/jobs/${job._id}`} passHref>
        <div className={`${styles.card} ${styles.job}`} key={job._id}>
          <h2>{job.title}</h2>
          <Image src={job.image} alt="" width={100} height={100} className={styles.profileImg}/>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Employment Type</p>
            <p className={styles.col2}>{job.employmenttype}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Salary</p>
            <p className={styles.col2}>{`${job.salary} $`}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Salary Duration</p>
            <p className={styles.col2}>{`${job.salaryduration.value} ${job.salaryduration.unit}`}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Work Days</p>
            <p className={styles.col2}>{job.workdays.length}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Work hours</p>
            <p className={styles.col2}>{job.workhours.length}</p>
          </div>
          <div className={styles.section}>
            <p className={styles.col11}>Description</p>
            <p className={styles.col22}>{shorten(job.description)}</p>
          </div>
        </div>
      </Link>
    )
    )
  )
}

export default card