import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const EditJob = dynamic(
  () => import("../../../components/EditJob"),
  {ssr: false}
)

const Page = ({ job,providers,talents,crews,token }) => {
  return (
    <EditJob providers={providers} token={token} talents={talents} crews={crews} job={job}/>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken || "";
  var res1={};
  var res2={};
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
    const res11 = await server.get(`api/jobs/${context.params.id}`);
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
try{
  const res22 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  res2=res22;
}catch(err){
if(err.response.status>=300){
  res2.data.crews=[]
  res2.data.providers=[]
  res2.data.talents=[]
}
}

  return {
    props: {
      job: res1.data,
      crews: res2.data.crews,
      talents: res2.data.talents,
      providers: res2.data.providers,
      token: accessToken,
    },
  };
};


export default Page;
