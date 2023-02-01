import React from 'react'
// import { signIn } from "next-auth/react"
import styles from "../styles/SignIn.module.css"
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PhoneNumberPopup from './PhoneNumberPopup';
const SignIn = ({toggleProfile}) => {
    // const handleSignIn = (method)=>{
    //     signIn(method,{callbackUrl:`${process.env.NEXT_PUBLIC_BASE_URL}`});
    // }
    return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.info}>
                <PhoneNumberPopup toggleProfile={toggleProfile}/>
            </div>
            <ChatBubbleIcon className={styles.back}/>
        </div>
    </div>
    )
}

export default SignIn