import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import EquipmentsDatatable from "./EquipmentsDatatable"

const EquipmentList = ({equipments,token}) => {
  return (
    <div className={styles.list}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
      <div className={styles.listContainer}>
        <EquipmentsDatatable token={token} equipments={equipments}/>
      </div>
    </div>
  )
}

export default EquipmentList