import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const SingleEquipment = dynamic(
  () => import("../../components/SingleEquipment"),
  {ssr: false}
)

const Page = ({ singleEq }) => {
  return (
    <SingleEquipment singleEq={singleEq}/>
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
    const res11 = await server.get(`api/equipments/${context.params.id}`);
    res1=res11;
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
      singleEq: res1.data
    },
  };
};


export default Page;
