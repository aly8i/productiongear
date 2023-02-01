import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect,useState } from 'react'

const NewsCard = ({news}) => {
  const shorten =(str) =>{
    var result;
    if(str.length>=83)
      result = str.substring(0,80)+"...";
    else
      result = str
    return result
  }
  return (
    news.map((n)=>(
      <Link key={n._id} href={`/news/${n._id}`} passHref >
        <div className={`${styles.card} ${styles.new}`} >
          <h2>{n.title}</h2>
          <Image src={n.image} alt="" width={100} height={100} className={styles.profileImg}/>
          <div className={styles.section}>
            <p className={styles.col11}>About</p>
            <p className={styles.col22}>{n.description?shorten(n.description):"Null"}</p>
          </div>
        </div>
      </Link>
    ))
  )
}
// 
export default NewsCard