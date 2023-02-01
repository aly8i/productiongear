import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import NewDatatable from "./NewDatatable"

const NewList = ({news,token}) => {
  return (
    <div className={styles.list}>
      <div className={styles.side}>
        <Sidebar/>
      </div>
      <div className={styles.listContainer}>
        <NewDatatable news={news} token={token}/>
      </div>
    </div>
  )
}

export default NewList