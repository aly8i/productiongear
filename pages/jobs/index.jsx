import React from 'react'
import Jobs from '../../components/Jobs'
import axios from 'axios'
function Page({jobs,options}) {
  return (
    <Jobs jobs={jobs} options={options}/>
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  const options = res2.data.crews.concat(res2.data.talents).concat(res2.data.providers)
  return {
    props: {
      jobs: res1.data.reverse(),
      options: options
    },
  };
}