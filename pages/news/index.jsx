import React from 'react'
import News from '../../components/News'
import axios from 'axios'
function Page({news}) {
  return (
    <News news={news} />
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`);
  return {
    props: {
      news: res1.data.reverse()
    },
  };
}