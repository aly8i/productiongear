import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const Article = dynamic(
  () => import("../../components/Article"),
  {ssr: false}
)

const User = ({ article }) => {
  return (
      <Article article={article}/>
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
    const res11 = await server.get(`api/news/${context.params.id}`);
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
  return {
    props: {
      article: res1.data
    },
  };
};


export default User;
