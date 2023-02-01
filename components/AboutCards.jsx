import React from 'react'
import styles from '../styles/AboutCards.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
const AboutCards = ({images}) => {
    useEffect(()=>{
        images.map((image,i)=>{
          document.documentElement.style.setProperty('--img'+`${i+1}`, 'url('+ `${image}` +')');
        })
    },[])
  return (
    <div className={styles.container1}>
        <h4>Services</h4>
        <div className={styles.container2}>
            {
            images?.map((image,i)=>(
                
                <div key={i} className={`${styles.flip} ${styles.flipVertical}`}>
                    <div className={`${styles.front} ${i==0?styles.image1:i==1?styles.image2:i==2?styles.image3:i==3?styles.image4:i==4?styles.image5:i==5?styles.image6:i==6?styles.image7:i==7?styles.image8:styles.image9}`} >
                        <h1 className={styles.textShadow}>{image.title}</h1>
                    </div>
                    <div className={styles.back}>
                        <h2>{image.title}</h2>
                        <p>{image.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AboutCards