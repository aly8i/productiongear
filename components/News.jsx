import React from 'react'
import styles from '../styles/Jobs.module.css'
import NewsCard from './NewsCard'
import Search from './Search'
import { useState,useEffect } from 'react'

const News = ({news}) => {
    const [searched,setSearched] = useState("");
    const [filteredNews,setFilteredNews] = useState(news);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredNews(news);
      }
      if(searchedVal.toLowerCase().includes("#")){
        const filter2 = news.filter((obj) => {
          return obj.tags.includes(searchedVal.toLowerCase().substring(1,80));
        });
        setFilteredNews(filter2);
        return
      }
        const filter1 = news.filter((obj) => {
          return obj.title?.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setFilteredNews(filter1);
    };
    useEffect(()=>{
      requestSearch(searched);
    },[searched])
  return (
      <div className={styles.container}>
        <main className={styles.main}>
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                  <Search searched={searched} setSearched={setSearched}/>
                </div>  
            </div>
            <div className={styles.grid}>
              <NewsCard news={filteredNews}/>
            </div>
        </main>
    </div>
  )
}

export default News
