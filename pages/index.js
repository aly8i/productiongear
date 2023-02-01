import styles from "../styles/Home.module.css";
import AboutCards from "../components/AboutCards";
import CubeSlider from "../components/CubeSlider";
import Mobile from "../components/Mobile";
import axios from "axios";
export default function Home({statics}) {

  return (
    <>
      <CubeSlider images={statics.cubeslider}/>
      <div className={styles.grid}>
        <AboutCards images={statics.servicecards}/>
      </div>
      <Mobile applestore={statics.applestore} googlestore={statics.googlestore} appname={statics.appname}/>
    </>

  );
}
export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
    return {
      props: {
        statics: res.data,
    },
  } 
}
