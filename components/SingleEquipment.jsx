import React from 'react'
import Image from 'next/image'
import styles from "../styles/SingleEquipment.module.scss"
import { useEffect, useState } from "react";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import { addProduct } from "../redux/cartSlice";
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper/core';
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import 'swiper/css/effect-fade';
import { useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import Calendar from "../components/Calender"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Proceed from './Proceed';
function SingleEquipment({ singleEq }) {
  const user = useSelector((state) => state.user);
  const [price, setPrice] = useState(type=="Buy"?singleEq.price:0);
  const [attributes, setAttributes] = useState(singleEq.attributes||[]);
  const [type,setType] = useState((singleEq.forr=="Rent or Sell"||singleEq.forr=="Sell")?"Buy":"Rent");
  const [date2,setDate2] = useState(null);
  const [date1,setDate1] = useState(null);
  const [duration,setDuration] = useState(null);
  const [extras, setExtras] = useState(singleEq.extras||[]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showProceed,setShowProceed] = useState(false);
  const [selectedAtrributes,setSelectedAttributes] = useState([]);
  const [selectedExtras,setSelectedExtras] = useState([]);

  const triggerDetails = () => {
    if(showProceed==false){
      setShowProceed(true);
    }else{
      setShowProceed(false);
    }
  }

  useEffect(()=>{
    if(type=="Rent"){
      var priceindex = 0;
      var result = 0;
      for(var i =0;i<singleEq.rentprices.length;i++){
        if(duration>=singleEq.rentprices[i].duration){
          priceindex = i;
        }
      }
      result = (singleEq.rentprices[priceindex].price*duration)/singleEq.rentprices[priceindex].duration;
      result = parseFloat(result).toFixed(0);
      setPrice(result);
    }else{
      setPrice(singleEq.price)
    }
  },[duration,type]);

  const addToCart = () => {
    if(user.username=='Guest'){
      router.push('/socialogin');
      return;
    }
    dispatch(addProduct({ ...singleEq, extras , price , attributes , quantity }));
  };
  const decrementFn = ()=>{
    if(quantity==1) return;
    const temp = quantity - 1;
    setQuantity(temp);
  }
  const incrementFn = () =>{
    const temp = quantity + 1;
    setQuantity(temp);
  }
  SwiperCore.use([Autoplay]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{singleEq.name}</h1>
      <div className={styles.top}>
        <div className={styles.swiperwrapper}>
          <Swiper className={styles.swiper}
            modules={[Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            autoplay={{
              "delay": 5500,
              "disableOnInteraction": true,
              "pauseOnMouseEnter": true
            }}
            pagination={{ clickable: true }}>
            {singleEq.images.map((image, id) => {
              return (
                <SwiperSlide key={id} className={styles.imgwrapper}>
                  <div className={styles.imgContainer}>
                    <Image src={image} alt={image} layout="fill" className={styles.slide} objectFit="contain" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className={styles.bottom}>
      <div className={styles.sectionwrapper}>
        <div className={styles.section}>
          <p className={styles.sectionHeading}>Buying Price :</p>
          <p className={styles.sectionContent}>{singleEq.price}{" $"}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionHeading}>Rent Prices :</p>
          <p className={styles.sectionContent}>
          { 
            singleEq.rentprices?.map((p,i)=>(
              <div key={i} className={styles.value}>{`${p.price} $ /${p.duration} days`}</div>
            ))
          }
          </p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionHeading}>Category :</p>
          <p className={styles.sectionContent}>{singleEq.category||"NAN"}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionHeading}>Warranty :</p>
          <p className={styles.sectionContent}>{singleEq.warranty||"NAN"}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionHeading}>For :</p>
          <p className={styles.sectionContent}>{singleEq.forr||"NAN"}</p>
        </div>
        {singleEq.rentduration && 
          <div className={styles.section}>
            <p className={styles.sectionHeading}>Rent Duration :</p>
            <p className={styles.sectionContent}>{singleEq.rentduration||"NAN"}</p>
          </div>}
        </div>
      </div>
      <div className={styles.gotowrapper}>
      {singleEq.forr=="Sell or Rent"&&
      <FormControl sx={{ minWidth: 210 }}>
        <InputLabel>Type</InputLabel>
        <Select
          id="outlined-name"
          value={type}
          label="Type"
          color="grey"
          onChange={(e) => setType(e.target.value)}
          renderValue={(value) => `${value}`}
        >
          <MenuItem value={'Buy'}>Buy</MenuItem>
          <MenuItem value={'Rent'}>Rent</MenuItem>
        </Select>
      </FormControl>}
        <div className={styles.quantitywrapper}>
          <div className={styles.quantitybtn} >
            <RemoveCircleIcon className={styles.subQ} onClick={()=>decrementFn()}/>
          </div>
          <div className={styles.quantity}>
            {quantity}
          </div>
          <div className={styles.quantitybtn} onClick={()=>incrementFn()}>
            <AddCircleIcon className={styles.addQ} />
          </div>
        </div>
        <div className={styles.goto} onClick={()=>triggerDetails()}>
          Add to Cart
        </div>
      </div>
      {showProceed&&<Proceed triggerDetails={triggerDetails} setSelectedExtras={setSelectedExtras} setSelectedAttributes={setSelectedAttributes} extras={extras} selectedExtras={selectedExtras} selectedAtrributes={selectedAtrributes} attributes={attributes} addToCart={addToCart} setDate1={setDate1} setDate2={setDate2} setDuration={setDuration} price={price} setType={setType} type={type} />}
    </div>
  );
}

export default SingleEquipment

