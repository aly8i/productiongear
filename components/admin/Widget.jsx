import styles from "../../styles/adminWidget.module.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Link from "next/link";
import NewspaperIcon from '@mui/icons-material/Newspaper';
const Widget = ({ type,amount }) => {
  let data;
  const diff = Math.floor(Math.random() * 10);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        forward:"/admin/users",
        icon: (
          <PersonOutlinedIcon
            className={styles.icon}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "job":
      data = {
        title: "JOBS",
        isMoney: false,
        link: "View All Jobs",
        forward:"/admin/jobs",
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
        forward:"/admin/equipments",
        icon: (
          <HomeRepairServiceIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "new":
      data = {
        title: "NEWS",
        isMoney: false,
        link: "View all News",
        forward:"/admin/news",
        icon: (
          <NewspaperIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data.isMoney && "$"} {amount}
        </span>
        <Link href={data.forward?data.forward:"/admin"} passHref>
          <span className={styles.link}>{data.link}</span>
        </Link>
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
