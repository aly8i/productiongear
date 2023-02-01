import axios from "axios";
import React from "react";
import dynamic from 'next/dynamic';
const EditNew = dynamic(
  () => import("../../../components/EditNew"),
  {ssr: false}
)

const page = ({ article , token }) => {
  return (
    <EditNew obj={article} token={token}/>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${context.params.id}`
  );
  return {
    props: {
      article: res.data,
      token: token
    },
  };
};


export default page;
