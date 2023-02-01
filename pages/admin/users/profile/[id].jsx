import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const Single = dynamic(
  () => import("../../../../components/admin/single/Single"),
  {ssr: false}
)

const User = ({ user,equipments,token }) => {
  return (
      <Single user={user} equipments={equipments} token={token} type="admin"/>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1 ={};
  var res2 ={};
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
    res1=res11
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
  try{
    const res22 = await server.get(`api/equipments/find/${context.params.id}`);
    res2=res22
  }catch(err){
    if(err.response?.status>=300){
        res2=[]
      };
    }
    return {
      props: {
        user: res1.data,
        equipments: res2.data,
        token: accessToken,
    },
  } 
};


export default User;
