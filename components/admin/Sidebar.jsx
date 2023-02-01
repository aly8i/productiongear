import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import styles from "../../styles/adminSidebar.module.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeedIcon from '@mui/icons-material/Feed';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
          <span className={styles.logo}>Admin Panel</span>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <Link href="/admin" passHref>
            <li>
              <DashboardIcon className={styles.icon} />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className={styles.title}>LISTS</p>
            <Link href="/admin/users" passHref>
              <li>
                <PersonOutlineIcon className={styles.icon} />
                <span>Users</span>
              </li>
            </Link>
            <Link href="/admin/equipments" passHref>
              <li>
                <HomeRepairServiceIcon className={styles.icon} />
                <span>Equipments</span>
              </li>
            </Link>
            <Link href="/admin/jobs" passHref>
              <li>
                <CreditCardIcon className={styles.icon} />
                <span>Jobs</span>
              </li>
          </Link>
          <Link href="/admin/news" passHref>
            <li>
              <FeedIcon className={styles.icon} />
              <span>News</span>
            </li>
          </Link>
          <p className={styles.title}>USEFUL</p>
          <Link href="/admin/statics" passHref>
          <li>
            <InsertChartIcon className={styles.icon} />
            <span>Statics</span>
          </li>
          </Link>
          <li>
            <NotificationsNoneIcon className={styles.icon} />
            <span>Notifications</span>
          </li>
          <p className={styles.title}>SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className={styles.icon} />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className={styles.icon} />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className={styles.icon} />
            <span>Settings</span>
          </li>
          <p className={styles.title}>USER</p>
          <li>
            <AccountCircleOutlinedIcon className={styles.icon} />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className={styles.icon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
