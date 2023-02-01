import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect,useState } from "react";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import GiteIcon from '@mui/icons-material/Gite';
import Table from "../../components/Table"
const Order = ({ order }) => {

  const [status,setStatus] = useState(order.status);
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  useEffect(()=>{
    setStatus(order.status);
  },[order])
  return (
    <div className={styles.container}>
      <div className={styles.up}>
        <div className={styles.row}>
          <div className={styles.item}>
            <h5 className={styles.header}>order ID</h5>
            <span className={styles.id}>{order._id}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Phone Number</h5>
            <span className={styles.id}>{order.phoneNumber}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Location</h5>
            <span className={`${styles.cellWithStatus} ${styles.active}`}>{order.location.lat}</span><span className={`${styles.cellWithStatus} ${styles.passive}`}>{order.location.lng}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Total</h5>
            <span className={styles.total}><b>${order.total}</b></span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Address</h5>
            <span className={styles.address}>{order.address}</span>
          </div>
        </div>
        </div>
        <div className={styles.middle}>
          <Table order={order} />
        </div> 
        
        <div className={styles.down}>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <HomeRepairServiceIcon className={styles.icon}/>
            <span>Pending</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <DeliveryDiningIcon className={styles.icon}/>
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <GiteIcon className={styles.icon}/>
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/images/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};
export default Order;
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};


