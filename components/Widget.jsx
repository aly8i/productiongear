import styles from "../styles/adminWidget.module.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll" ;
const Widget = ({ type,amount }) => {
  let data;
  const diff = Math.floor(Math.random() * 10);

  switch (type) {
    case "job":
      data = {
        title: "JOBS",
        isMoney: false,
        link: "View All Jobs",
        forward:"jobs",
        icon: (
          <WorkOutlineIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "equipment":
      data = {
        title: "EQUIPMENTS",
        isMoney: false,
        link: "View All Equipments",
        forward:"equipments",
        icon: (
          <HomeRepairServiceIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data.isMoney && "$"} {amount}
        </span>
        <ScrollLink to={data.forward} spy={true} smooth={true} offset={-100} duration={500}>
          <span className={styles.link}>{data.link}</span>
        </ScrollLink>
      </div>
      <div className={styles.right}>
        <div className={`${styles.percentage} ${styles.positive}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
