import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import lt from "../public/lt.png"
import Link from 'next/link'
const Footer = () => {
    
  return (
<footer>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<div className={styles.footer}>
<div className={styles.row}>
<a href={process.env.NEXT_PUBLIC_FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">
  <i class="fa fa-facebook"></i>
</a>
<a href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
  <i class="fa fa-instagram"></i>
</a>
<a href={process.env.NEXT_PUBLIC_LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
  <i class="fa fa-linkedin"></i>
</a>
<a href={process.env.NEXT_PUBLIC_TWITTER_LINK} target="_blank" rel="noopener noreferrer">
  <i class="fa fa-twitter"></i>
</a>
</div>

<div className={styles.row}>
<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">Our Services</a></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div className={styles.row}>
    <div className={styles.copyright}></div>
    <p>Powered by</p> 
    <a href={process.env.NEXT_PUBLIC_LT_LINK}  target="_blank" rel="noopener noreferrer">
      <Image className={styles.logo} src={lt} alt="Lebanon Token" width={150} height={95}/>
    </a>
</div>
</div>
</footer>

  )
}

export default Footer