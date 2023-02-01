import React from 'react'
import Talents from '../../components/Talents'
import axios from 'axios'
function Page({users,options}) {
  return (
    <Talents users={users} options={options}/>
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  const options = res2.data.crews.concat(res2.data.talents).concat(res2.data.providers);
  const res11 = res1.data.filter(obj=>(obj.address?.country!=""&&obj.address?.country!=null&&obj.about!=null&&obj.about!=""&&obj.department!=null&&obj.department!=""&&obj.speciality!=null&&obj.speciality!=""&&obj.yearsofexperience!=null&&obj.yearsofexperience!=""&&obj.education?.fieldofstudy!=null&&obj.education?.fieldofstudy!=""&&obj.education?.educationlevel!=null&&obj.education?.educationlevel!=""&&obj.education?.graduationyear!=null&&obj.education?.graduationyear!=""))
  return {
    props: {
      users: res11,
      options: options
    },
  };
}