import React from 'react'
import Equipments from '../../components/Equipments'
import axios from 'axios'
function Page({equipments}) {
  return (
    <Equipments equipments={equipments} />
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/equipments`);
  return {
    props: {
      equipments: res1.data.reverse()
    },
  };
}