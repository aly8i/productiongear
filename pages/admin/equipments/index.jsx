import dynamic from 'next/dynamic';
import axios from "axios";
const EquipmentList = dynamic(
  () => import("../../../components/admin/EquipmentList"),
  {ssr: false}
)
const page = ({equipments,token}) => {
  return (
    <EquipmentList equipments={equipments} token={token}/>
  );
};

export default page;

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken;
  const equipments = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/equipments`);
  return {
    props: {
      equipments: equipments.data,
      token: accessToken,
    },
  };
};