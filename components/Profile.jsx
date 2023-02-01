import React, { useEffect } from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import styles from "../styles/Profile.module.css"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareIcon from '@mui/icons-material/Share';
import { signOut } from "next-auth/react"
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';

const Profile = ({toggleProfile}) => {
    const user = useSelector((state) => state.user);
    const logout = async() => {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/logout`).then((res)=>{
          signOut(); 
        });
      };
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.info}>
                <Image className={`${styles.profileImg} ${styles.img}`} width={180} height={180} src={user.image} alt=""/>
                <div className={styles.section}>
                    <div onClick={()=>toggleProfile()}>
                        <Link href={`/users/profile/edit/${user.id}`} >
                            <p className={styles.name}>{user.username}</p>
                        </Link>
                    </div>
                    <div className={styles.sectionsub}>
                        <div className={styles.button}>
                            <MeetingRoomIcon onClick={()=>{logout()}} />
                        </div>
                        <div className={styles.button}>
                            <ShareIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <ChatBubbleIcon className={styles.icon}/>
        </div>
    </div>
  )
}

export default Profile