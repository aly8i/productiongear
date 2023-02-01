import React from 'react'
import styles from "../styles/Navbar.module.css"
import logo2 from "../public/lightstudiosmall.png"
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser,resetUser } from '../redux/userSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Profile from './Profile';
import SignIn from '../components/SignIn';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const Navbar = ({nav}) => {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const router= useRouter();
    const [showMenu,setShowMenu] = useState("false");
    const [profile,setProfile] = useState("false");
    const dispatch = useDispatch();
      const loginWithToken = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/signinwithtoken`,{},{
          withCredentials: true
        }).then((res)=>{
            dispatch(addUser({id:res.data.sub,username:res.data.username,fullname:res.data.username,image:res.data.image}));
        }).catch((err)=>{
          console.log("You are not Signed In");
        });
      }
    useEffect(()=>{
    loginWithToken().catch((err)=>{
        console.log(err);
        });
    
    },[user?.image])

    const toggleMenu = ()=>{
        if(showMenu=="true"){
            setShowMenu("false");
        }else{
            setShowMenu("true")
        }
    }

    const toggleProfile = ()=>{
      if(profile=="false"&&user.username!="Guest"){
        setProfile("profile");
      }else if(profile=="false"&&user.username=="Guest"){
        setProfile("signin");
      }else{
        setProfile("false");
      }
    }

    const getLinks = () =>{
        return(
            <>
              <div onClick={()=>{router.push("/")}} className={nav=="/"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Home</div>
              {/* <div onClick={()=>{router.push("/jobs")}} className={nav=="/jobs"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Jobs</div> */}
              <div onClick={()=>{router.push("/talents")}} className={nav=="/talents"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Talents</div>
              {/* <div onClick={()=>{router.push("/employers")}} className={nav=="/employers"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Employers</div> */}
              <div onClick={()=>{router.push("/equipments")}} className={nav=="/equipments"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Equipments</div>
              <div onClick={()=>{router.push("/news")}} className={nav=="/news"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>News</div>
            </>
        )
    }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
            <Image src={logo2} alt="" width={180} height={50}/>
        </div>
        <div className={styles.headerMenu}>
            {getLinks()}
        </div>
        <div className={styles.hamburger}>
            <MenuIcon className={styles.hamburgerImage} onClick={()=>toggleMenu()}/>
        </div>
        <div className={styles.headerProfile}>
            <div className={styles.notification}>
              <div className={styles.cartQuantity}>
                {cart.quantity}
              </div>
              <LocalMallIcon onClick={()=>{router.push("/cart")}} className={styles.lock}/>
            </div>
            {
              user.username!="Guest"?
              (
                <div className={styles.imageCon}>
                  <Image className={`${styles.profileImg} ${styles.img}`} onClick={()=>toggleProfile()} alt="" width={25} height={25}
                  src={user.image}/>
                </div>
              )
              :(< LockOpenIcon onClick={()=>toggleProfile()} className={styles.lock}/>)
            }
            </div>
          </div>
        {showMenu=="true"&&(
        <div className={styles.subHeader}>
            <div className={styles.subHeaderMenu}>
                {getLinks()}
            </div>
        </div>
        )}
        {profile=="profile"?
          <Profile toggleProfile={toggleProfile}/>
        :profile=="signin"&&(
          <SignIn toggleProfile={toggleProfile}/>
        )}
    </>
  )
}

export default Navbar