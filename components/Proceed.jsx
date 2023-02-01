import { useState,useEffect } from "react";
import styles from "../styles/OrderDetail.module.css";
import Calender from "../components/Calender"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Proceed = ({ triggerDetails , addToCart , setDate1 , setDate2 ,  setDuration , price , setPrice , type , setType , attributes , extras , selectedAtrributes ,  selectedExtras, setSelectedExtras, setSelectedAttributes }) => {
const check = (value,index)=>{
    if(selectedAtrributes.length>0){
        if(selectedAtrributes[index].value==value)
            return true
    }else{
        return false
    }
}
const toggleAttr = (value,attr) => {
    var temp = [...selectedAtrributes];
    var found = -1;
    for(var i = 0;i<selectedAtrributes.length;i++){
      if(selectedAtrributes[i].type==attr.type){
        found=i;
        break;
      }
    }
    if(found>=0){
      if(value==selectedAtrributes[found].value){
        temp=temp.filter(ins => ins.value!=value);
      }else{
        temp[0]={type:selectedAtrributes[found].type,value};
      }
    }else{
      temp.push({type:attr.type,value});
    }
    setSelectedAttributes(temp);
  }
  const toggleExtra = (extra) => {
    var found = selectedExtras.includes(extra)
    var temp = [...selectedExtras];
    if(found){
        temp=temp.filter(ins => ins.type!=extra.type);
    }else{
      temp.push(extra);
    }
    setSelectedExtras(temp);
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>More Details</h1>
          <div className={styles.item}>
            <h3>Price</h3>
          </div>
          <div className={styles.item}>
            <h4>{`${price} $`}</h4>
          </div>
          <div className={styles.item}>
            <h3>You want to</h3>
          </div>
          <div className={styles.item}>
            <FormControl sx={{ minWidth: 210 }}>
                <Select
                    id="outlined-name"
                    value={type}
                    label="Type"
                    onChange={(e) => setType(e.target.value)}
                    renderValue={(value) => `${value}`}
                >
                    <MenuItem value={'Buy'}>Buy</MenuItem>
                    <MenuItem value={'Rent'}>Rent</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className={styles.item}>
            Attributes
            {
              attributes.map((attr,index)=>(
                <div className={styles.scroll}>
                    <h5 className={styles.attrtype}>{`${attr.type}`+'\xa0\xa0\xa0'+":"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}</h5>
                    {
                      attr.values.map((value)=>(
                          <div key={`${index} ${value}`} onClick={()=>{toggleAttr(value,attr)}} className={check(value,index)?`${styles.attribute} ${styles.selected}`:`${styles.attribute}`}>{value}</div>
                      ))
                    }
                </div>
              ))
            }
          </div>
          <div className={styles.item}>
            Extras
            {
              extras.map((extra,index)=>(
                <div className={styles.scroll}>
                  <h5 className={styles.attrtype}>{`${extra.type}`+'\xa0\xa0\xa0'+":"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}</h5>
                  <div key={`${index}`} onClick={()=>{toggleExtra(extra)}} className={selectedExtras.includes(extra)?`${styles.attribute} ${styles.selected}`:`${styles.attribute}`}>{extra.type}</div>
                </div>
              ))
            }
          </div>
          {type=="Rent"&&
            <div className={styles.item}>
                <Calender setDate1={setDate1} setDate2={setDate2} setDuration={setDuration} />
            </div>
          }
          <button className={styles.button} onClick={()=>{addToCart();triggerDetails();}}>
            Add To Cart
          </button>
        </div>
      </div> 
    </>
  );
};

export default Proceed;
