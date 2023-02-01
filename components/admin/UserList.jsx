import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import UserDatatable from "./UserDatatable"

const UserList = ({users,token}) => {
  return (
    <div className={styles.list}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
      <div className={styles.listContainer}>
        <UserDatatable users={users} token={token}/>
      </div>
    </div>
  )
}

export default UserList