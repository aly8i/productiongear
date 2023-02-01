import Sidebar from "./Sidebar";
import styles from "../../styles/adminHome.module.scss";
import Widget from "./Widget";
import Chart from "./chart/Chart"; 

const Home = ({users,jobs,equipments,news}) => {
  return (  
    <div className={styles.home}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
        <div className={styles.homeContainer}>
         <div className={styles.widgets}>
           <Widget type="user" amount={users.length}/>
           <Widget type="job" amount={jobs.length}/>
           <Widget type="new" amount={news.length}/>
           <Widget type="equipment" amount={equipments.length}/>
         </div>
         <div className={styles.charts}>
           <Chart className={styles.chart} users={users} type="user" aspect={6 / 2} />
           {/* <Chart className={styles.chart} users={jobs} type="job" aspect={6 / 1} />
           <Chart className={styles.chart} users={equipments} type="new" aspect={6 / 1} />
           <Chart className={styles.chart} users={news} type="equipment" aspect={6 / 1} /> */}
         </div>
      </div>
 </div>
  );
};

export default Home;
