import React from 'react'
import styles from '../styles/Jobs.module.css'
import TalentCard from './EmployeerCard'
import Search from './Search'
import { useState,useEffect } from 'react'

const Talents = ({users,options}) => {
    const [searched,setSearched] = useState("");
    const [filteredUsers,setFilteredUsers] = useState(users);
    const [filteredOptions,setFilteredOptions] = useState([]);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredUsers(users);
      }
        const filter1 = users.filter((obj) => {
          return (obj.fullname?.toLowerCase().includes(searchedVal.toLowerCase())||obj.speciality?.toLowerCase().includes(searchedVal.toLowerCase()) || searchedVal.toLowerCase().includes(obj.category)) && obj.view?.toLowerCase().includes("talent");
        });
        setFilteredUsers(filter1);
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
            <TalentCard users={filteredUsers}/>
          </div>
        </main>
    </div>
  )
}

export default Talents
