import React from 'react'
import Image from 'next/image'
import styles from "../styles/Article.module.scss"
const Article = ({article}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>
        
        {article.article.map((section)=>(
            <>
                <h4 className={styles.sectionTitle}>{section.sectionTitle}</h4>
                <p className={styles.sectionContent}>{section.sectionContent}</p>
            </>
        ))}
        <div className={styles.image}>
            <Image src={article.image} alt="" objectFit="contain" layout="fill" objectPosition="center center"/>
        </div>
    </div>
  )
}

export default Article