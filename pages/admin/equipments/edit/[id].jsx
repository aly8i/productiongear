import axios from "axios";
import React from "react";
import dynamic from 'next/dynamic';
const EditEquipment = dynamic(
  () => import("../../../../components/EditEquipment"),
  {ssr: false}
)

const page = ({ equipment , token }) => {
  return (
    <EditEquipment equipment={equipment} token={token}/>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${context.params.id}`
  );
  return {
    props: {
      equipment: res.data,
      token: token
    },
  };
};


export default page;
