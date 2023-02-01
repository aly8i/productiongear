import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import JobsDatatable from "./JobsDatatable"

const EquipmentList = ({jobs,token}) => {
  return (
    <div className={styles.list}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
      <div className={styles.listContainer}>
        <JobsDatatable token={token} jobs={jobs}/>
      </div>
    </div>
  )
}

export default EquipmentList