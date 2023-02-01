import axios from "axios";
import React from "react";
import dynamic from 'next/dynamic';
const SingleJob = dynamic(
  () => import("../../components/SingleJob"),
  {ssr: false}
)

const User = ({ job }) => {
  return (
    <SingleJob job={job}/>
  );
};

export const getServerSideProps = async (context) => {
  try{
    const res11 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${context.params.id}`);
    return {
      props: {
        job: res11.data,
    },
  } 
  }catch(err){
      return {
        redirect: {
          permanent: false,
          destination: "/"
        },
      };
  }
 
};


export default User;
