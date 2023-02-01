import React from 'react'
import AddJob from '../../components/AddJob'
import axios from 'axios';
const add = ({crews,talents,providers}) => {
  return (
    <AddJob crews={crews} talents={talents} providers={providers}/>
  )
}
export default add

export const getServerSideProps = async() => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  return {
    props: {
      crews: res1.data.crews,
      talents: res1.data.talents,
      providers: res1.data.providers
    },
  }
}