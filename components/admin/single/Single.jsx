import styles from "../../../styles/adminSingle.module.scss";
import Widget from "../../Widget";
import EquipmentsDatatable from "../EquipmentsDatatable";
import Link from "next/link";
import JobsDatatable from "../JobsDatatable";

const Single = ({ user ,jobs ,equipments , token , type }) => {
  return (
    <div className={styles.single}>
      <div className={styles.singleContainer}>
          <div className={styles.top}>
            <div className={styles.userinfo}>
            <Link href={type=="admin"?`/users/profile/edit/${user._id}`:`/users/profile/edit/${user._id}`} passHref>
              <div className={styles.editButton}>Edit</div>
            </Link>
            <h1 className={styles.title}>Information</h1>
            <div className={styles.item}>
              <img
                src={user.image?user.image:"/img/guest.png"}
                alt=""
                className={styles.itemImg}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>{user.username}</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>{user.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Phone:</span>
                  <span className={styles.itemValue}>{user.phonenumber?user.phonenumber:"NAN"}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Country:</span>
                  <span className={styles.itemValue}>
                    {user.address?.country||"NAN"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Role:</span>
                  <span className={styles.itemValue}>{user.role}</span>
                </div>
              </div>
            </div>

          </div>
          <div className={styles.widgets}>
              <Widget type="job" amount={jobs.length}/>
              <Widget type="equipment" amount={equipments.length}/>
          </div>
        </div>
        <div id="jobs" className={styles.bottom}>
            <div className={styles.table}>
            <h1 className={styles.title}>Jobs</h1>
              <JobsDatatable className={styles.t} jobs={jobs} token={token} />
            </div>

        </div>
        <div id="equipments" className={styles.bottom}>
            <div className={styles.table}>
            <h1 className={styles.title}>Equipments</h1>
              <EquipmentsDatatable className={styles.t} equipments={equipments} token={token} />
            </div>
        </div>
       
      </div>
    </div>
  );
};
export default Single;