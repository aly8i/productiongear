import dynamic from 'next/dynamic';
import axios from "axios";
const JobList = dynamic(
  () => import("../../../components/admin/JobList"),
  {ssr: false}
)
const page = ({jobs,token}) => {
  return (
    <JobList jobs={jobs} token={token}/>
  );
};

export default page;

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
  return {
    props: {
      jobs: res.data,
      token: accessToken,
    },
  };
};