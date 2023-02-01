import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import styles from "../../../../styles/User.module.css";
import dynamic from 'next/dynamic';
const EditUser = dynamic(
  () => import("../../../../components/EditUser"),
  {ssr: false}
)

const User = ({ user,token,crews,providers,talents }) => {
  return (
    <div className={styles.container}>
      <EditUser user={user} token={token} crews={crews} providers={providers} talents={talents} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken || "";
  var res1={};
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );
  try{
    const res11 = await server.get(`api/users/${context.params.id}`);
    res1=res11;
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  return {
    props: {
      user: res1.data,
      crews:res2.data.crews,
      talents: res2.data.talents,
      providers: res2.data.providers,
      token: accessToken
    },
  };
};


export default User;
