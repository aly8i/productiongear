import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const SingleUser = dynamic(
  () => import("../../components/SingleUser"),
  {ssr: false}
)

const User = ({ user }) => {
  return (
    <SingleUser user={user}/>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res ={};

  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      accessToken =  context.req.cookies.accessToken || Cookies.get("accessToken");
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
    res=res11
  }catch(err){
      return {
        redirect: {
          permanent: false,
          destination: "/"
        },
      };
  } 

    return {
      props: {
        user: res.data,
    },
  } 
};


export default User;
