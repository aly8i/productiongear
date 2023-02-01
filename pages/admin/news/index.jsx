import dynamic from 'next/dynamic';
import axios from "axios";
const NewList = dynamic(
  () => import("../../../components/admin/NewList"),
  {ssr: false}
)
const page = ({news,token}) => {
  return (
        <NewList news={news} token={token}/>
  );
};

export default page;

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1={};
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      accessToken =  context.req.cookies.accessToken;
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
    const res11 = await server.get("api/news/");
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
      news: res1.data,
      token: accessToken,
    },
  };
};