import React from 'react'
import styles from '../styles/Jobs.module.css'
import EquipmentCard from './EquipmentCard'
import Search from './Search'
import { useState,useEffect } from 'react'
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { categories } from './data'
import Typography from '@mui/material/Typography';
const Employeers = ({equipments}) => {
    const [searched,setSearched] = useState("");
    const [filteredEquipments,setFilteredEquipments] = useState(equipments);
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [category,setCategory] =useState("");
    const handleSlider = (event, newValue) => {
      setPriceRange(newValue);
    };
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredEquipments(equipments);
      } 
      const filter1 = equipments.filter((obj) => {
        return (obj.name?.toLowerCase().includes(searchedVal)||searchedVal.includes(obj.name?.toLowerCase()))&&(obj?.price>=priceRange[0]&&obj?.price<=priceRange[1])&&(category==obj?.category||category==""||category=="All");
      });
      setFilteredEquipments(filter1);
  };
    useEffect(()=>{
      requestSearch(searched);
    },[searched,priceRange,category])
  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.head}>
            <div className={styles.slider}>
            <Typography id="input-slider" gutterBottom>
              Price
            </Typography>
              <Slider
                className={styles.ss}
                getAriaLabel={() => 'Price Range'}
                value={priceRange}
                onChange={handleSlider}
                valueLabelDisplay="auto"
                getAriaValueText={()=>`${priceRange}$`}
                min={10}
                step={10}
                max={5000}
              />
            </div>
            <div className={styles.searchSection}>
              <div className={styles.searchWrapper}>
                <Search searched={searched} setSearched={setSearched}/>
              </div>
            </div>
            <div className={styles.filter}> 
              <FormControl sx={{ minWidth: 210 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  id="outlined-name"
                  value={category}
                  label="Category"
                  color="grey"
                  onChange={(e) => setCategory(e.target.value)}
                  renderValue={(value) => `${value}`}
                >
                <MenuItem value="All">All</MenuItem>
                  {categories.map((val)=>(
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.grid}>
            <EquipmentCard equipments={filteredEquipments}/>
          </div>
        </main>
    </div>
  )
}
export default Employeers
