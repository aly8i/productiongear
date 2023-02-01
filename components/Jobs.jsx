import styles from '../styles/Jobs.module.css'
import Card from '../components/Card'
import Search from '../components/Search'
import { useState,useEffect } from 'react'
import Link from 'next/link'
export default function Jobs({jobs,options}) {
  const [searched,setSearched] = useState("");
  const [filteredJobs,setFilteredJobs] = useState(jobs);
  const [filteredOptions,setFilteredOptions] = useState([]);
  const requestSearch = (searchedVal) => {
    if(searchedVal == ""){
      setFilteredJobs(jobs)
    }
      const filter1 = jobs.filter((obj) => {
        return (obj.title.toLowerCase().includes(searchedVal.toLowerCase()) || obj.speciality.toLowerCase().includes(searchedVal.toLowerCase()) || searchedVal.toLowerCase().includes(obj.category));
      }); 
      setFilteredJobs(filter1);
      
      const filter3 = options.filter((option)=>{return option.toLowerCase().includes(searchedVal.toLowerCase())})
      setFilteredOptions(filter3);
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
            {
              searched!=""?filteredOptions.length>0?filteredOptions[0].toLowerCase()!=searched.toLocaleLowerCase()?
              <ul className={styles.autocomplete}>{filteredOptions.slice(0,5).map((option,i)=><li key={i} onClick={()=>{setSearched(option)}}className={styles.autocompleteoption}>{option}</li>)}</ul>:<></>:<></>:<></>
            }
          </div>
        </div>
        <div className={styles.grid}>
          <Card jobs={filteredJobs}/>
        </div>
      </main>
    </div>
  )
}
