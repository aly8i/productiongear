import React from 'react'
import styles from "../styles/PhoneNumberPopup.module.css";
import {authentication} from '../Firebase';
import {RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { addPhone,addID } from "../redux/userSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Zoom from 'react-reveal/Zoom'
const PhoneNumberPopup = ({toggleProfile}) => {
  const [phonenumber,setPhonenumber]=useState("");
  const [OTP,setOTP] =useState("");
  const [username,setUsername] =useState("");
  const [id,setID] =useState("");
  const [stage,setStage] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const generateRecaptcha =()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response)=>{
        }
    },authentication);
} 
  const signUpUser = async () => {
    const payload = {username : username,phonenumber : phonenumber};
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/signupwithphone/`,payload,{
      withCredentials: true
    });
    dispatch(addPhone({phonenumber,username:res.data.username,fullname:res.data.username}));
    dispatch(addID({id: res.data._id}));
    setID(res.data._id);
    setStage(4);
  }
  const signInUser = async () => {
    const payload = {phonenumber : phonenumber};
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/signinwithphone/`,payload,{
        withCredentials: true
      });
      dispatch(addPhone({phonenumber,username:res.data.username,fullname:res.data.username}));
      dispatch(addID({id: res.data._id}));
      setStage(0);
      toggleProfile();
      router.push('/');
    }catch(err){
      setStage(2);
    }

  }
  const verifyOTP = () => {
  if (OTP.length === 6){
    let confirmationRes = window.confirmationResult;
    confirmationRes.confirm(OTP).then((result)=>{
      if(result){
      signInUser();
      }
    }).catch((error)=>{
      setStage(3);
    })
  }
}
const requestOTP = (e) => {
  e.preventDefault();
  let number = '+961'
  generateRecaptcha();
  let appVerifier = window.recaptchaVerifier;
  if(phonenumber.startsWith('03')){
    number = number + phonenumber.substring(1,8);
  }else{
    number = number + phonenumber;
  }
  signInWithPhoneNumber(authentication,number,appVerifier)
  .then(confirmationResult=>{
      window.confirmationResult = confirmationResult;
      setStage(1);
  }).catch((error)=>{
      setStage(3);
  })
}
  const Retry = () =>{
    router.reload(window.location.pathname);
  }
  const closeit = () =>{
    setClose(true);
  }
    return (
          <div className={styles.wrapper}>
            {stage == 0 &&
              <>
              <Zoom>
              <div className={styles.item}>
                <label className={styles.label}>Enter your Phone number</label>
                <OtpInput
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e)}
                  numInputs={8}
                  separator={<span style={{ width: "3px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "22px",
                    height: "22px",
                    background: "#000",
                    fontSize: "12px",
                    color: "#FFF",
                    fontWeight: "800",
                    caretColor: "white"
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                  }}
                />
              </div>
              <button className={styles.addButton} onClick={requestOTP}>
                Send OTP
              </button>
              </Zoom>
              </>
            }
            {stage == 1 && 
            <>
            <Zoom>
              <div className={styles.item}>
              <label className={styles.label}>OTP</label>
              <OtpInput
                value={OTP}
                onChange={(e) => setOTP(e)}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "27px",
                  height: "27px",
                  background: "#000",
                  fontSize: "12px",
                  color: "#FFF",
                  fontWeight: "800",
                  caretColor: "white"
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none"
                }}
              />
              </div>
              <button className={styles.submitBtn} onClick={verifyOTP}>
                Submit
              </button>
              </Zoom>
            </>
            }
            {
              stage == 2 && 
              <>
              <Zoom>
                <div className={styles.item}>
                <label className={styles.label}>Username</label>
                <input
                  className={styles.input}
                  type="text"
                  onChange= {(e) => setUsername(e.target.value)}
                />
                </div>
                <button className={styles.submitBtn} onClick={()=>signUpUser()}>
                Submit
                </button>
              </Zoom>
              </>
            }
            {
              stage == 3 && 
              <>
              <Zoom>
                <div className={styles.item}>
                  <label className={styles.label}>There was error in your request Please Reload</label>
                </div>
                <button className={styles.submitBtn} onClick={()=>Retry()}>
                  Reload
                </button>
              </Zoom>
              </>
            }
            {
              stage == 4 && 
              <>
              <Zoom>
                <div className={styles.item}>
                  <label className={styles.label}>
                    Registered Successfully
                  </label>
                </div>
                <div className={styles.icon}>
                  <CheckCircleIcon />
                </div>
                <div className={styles.btnWrapper}>
                  <button className={styles.submitBtn3} onClick={()=>router.push(`/users/profile/${id}`)}>
                    Complete Profile
                  </button>
                  <button className={styles.submitBtn3} onClick={()=>{router.push("/");toggleProfile();}}>
                    Skip
                  </button>
                </div>
              </Zoom>
              </>
            }
            <div className={styles.reca}id="recaptcha-container"/>
          </div>
          
    )
  };
  export default PhoneNumberPopup;