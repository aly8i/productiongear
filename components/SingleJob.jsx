import React from 'react'
import Image from 'next/image'
import styles from "../styles/SingleUser.module.scss"
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper/core';
import {useState,useEffect} from 'react'
import axios from "axios";
import { Line } from 'recharts';
import { Link } from '@mui/material';
const SingleJob = ({job}) => {
  SwiperCore.use([Autoplay]);
  return (
    <div className={styles.container}>
        <div className={styles.top}>
        <h1 className={styles.title}>{job.title}</h1>
            <div className={styles.imgContainer}>
                <Image src={job.image} alt={job.image} layout="fill" objectFit="contain" />
            </div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Department :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.department||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Speciality :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.speciality ||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Employment Type :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.employmenttype||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Salary :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.salary?`${job.salary}$`:"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>description :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.description||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Salary Duration :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.salaryduration?`every ${job.salaryduration?.value} ${job.salaryduration?.unit}`:"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Work Days :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.workdays?job.workdays.map((day,i)=>i+1!=job.workdays.length?`${day} | `:`${day}`):"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Work Hours :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{job.workhours?job.workhours.map((hour,i)=>i+1!=job.workhours.length?`${hour} | `:`${hour}`):"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <Link href={`/users/${job.userid?._id}`} passHref>
                <div className={styles.gotowrapper}>
                  <div className={styles.goto}>
                    Visit Employer
                  </div>
                </div>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default SingleJob

