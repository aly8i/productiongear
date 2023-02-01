import { accessToken } from 'mapbox-gl';
import React from 'react'
import AddNew from '../../components/AddNew'
const add = ({token}) => {
  return (
    <AddNew token={token}/>
  )
}
export const getServerSideProps = async (context) => {
    var accessToken = context.req.cookies.accessToken || "";
    return {
      props: {
        token: accessToken,
      },
    };
  };
  
export default add