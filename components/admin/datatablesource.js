import styles from "../../styles/adminDatatable.module.scss"
import Tooltip from '@mui/material/Tooltip';
export const cellFn =(status)=>{
  if(status=="active"){
    return <div className={`${styles.cellWithStatus} ${styles.active}`}>{status}</div>;
  }else if(status=="passive"){
    return <div className={`${styles.cellWithStatus} ${styles.passive}`}>{status}</div>;
  }else if(status=="pending"){
    return <div className={`${styles.cellWithStatus} ${styles.pending}`}>{status}</div>;
  }
  
}
export const newColumns = [
  { field: "_id", headerName: "ID", width: 120,
  renderCell: (params) => {
    return (
      <Tooltip title={params.row._id} placement="bottom">
        <div className={styles.id}>{params.row._id.substring(0,5)+"..."}</div>
      </Tooltip>       
      );
  },},
  {
    field: "title",
    headerName: "Title",
    width: 410,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.image} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 500,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <div className={styles.id}>{params.row.description.substring(0,60)+"..."}</div>
        </div>       
        );
    },
  },
];
export const userColumns = [
  { field: "_id", headerName: "ID", width: 120,
  renderCell: (params) => {
    return (
      <Tooltip title={params.row._id} placement="bottom">
        <div className={styles.id}>{params.row._id.substring(0,5)+"..."}</div>
      </Tooltip>       
      );
  },},
  {
    field: "username",
    headerName: "Username",
    width: 210,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.image} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "phonenumber",
    headerName: "phonenumber",
    width: 200,
  },
  {
    field: "role",
    headerName: "role",
    width: 90,
    renderCell: (params) => {
      if(params.row.role=="user"){
        return <div className={`${styles.cellWithStatus} ${styles.active}`}>user</div>;
      }else if(params.row.role=="delivery"){
        return <div className={`${styles.cellWithStatus} ${styles.passive}`}>delivery</div>;
      }else if(params.row.role=="admin"){
        return <div className={`${styles.cellWithStatus} ${styles.pending}`}>admin</div>;
      }
    },
  },
];

export const equipmentColumns = [
  { field: "_id", headerName: "ID", width: 120,
  renderCell: (params) => {
    return (
      <Tooltip title={params.row._id} placement="bottom">
        <div className={styles.id}>{params.row._id.substring(0,5)+"..."}</div>
      </Tooltip>       
      );
  },
},
  {
    field: "name",
    headerName: "Name",
    width: 210,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.images[0]} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "forr",
    headerName: "For",
    width: 100,
  },
  {
    field: "warranty",
    headerName: "Warranty",
    width: 200,
  }
];
export const jobColumns = [
  { field: "_id", headerName: "ID", width: 120,
  renderCell: (params) => {
    return (
      <Tooltip title={params.row._id} placement="bottom">
        <div className={styles.id}>{params.row._id.substring(0,5)+"..."}</div>
      </Tooltip>       
      );
  },},
  {
    field: "title",
    headerName: "Title",
    width: 210,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.image} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "postedby",
    headerName: "Posted By",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.userid?.image} alt="avatar" />
          <div className={styles.id}>{params.row.userid?.username}</div>
        </div>       
        );
    },
  },

  {
    field: "speciality",
    headerName: "Speciality",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.category} placement="bottom">
           <div className={styles.id}>{params.row.category}</div>
        </Tooltip>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.description} placement="bottom">
          <div className={styles.id}>{params.row.description.substring(0,16)+"..."}</div>
        </Tooltip>       
        );
    },
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 80,
  },
  {
    field: "employmenttype",
    headerName: "Emp. Type",
    width: 100,
  },
];
export const orderColumns = [
  { field: "_id", headerName: "ID", width: 70,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row._id} placement="bottom">
          <div className={styles.id}>{params.row._id.substring(0,5)+"..."}</div>
        </Tooltip>       
        );
    }, 
  },
  {
    field: "name",
    headerName: "Customer Name",
    width: 130,
  },
  {
    field: "phoneNumber",
    headerName: "Tel",
    width: 110,
  },
  {
    field: "total",
    headerName: "Total",
    width: 70,
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 170,
    renderCell: (params) => {
      return (
        <>
            <div className={`${styles.cellWithStatus} ${styles.active}`}>{params.row.createdAt.split('T')[0]}</div>
            <div className={`${styles.cellWithStatus} ${styles.passive}`}>{params.row.createdAt.split('T')[1].split('.')[0]}</div>
        </>
        );
    },
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    renderCell: (params) => {
      return (
        <>
            <div className={`${styles.cellWithStatus} ${styles.active}`}>{params.row.location['lat']}</div>
            <div className={`${styles.cellWithStatus} ${styles.passive}`}>{params.row.location['lng']}</div>
        </>
        
        );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
          if(params.row.status==0){
            return <div className={`${styles.cellWithStatus} ${styles.active}`}>Pending</div>;
          }else if(params.row.status==1){
            return <div className={`${styles.cellWithStatus} ${styles.passive}`}>On the way</div>;
          }else if(params.row.status==2){
            return <div className={`${styles.cellWithStatus} ${styles.pending}`}>Delivered</div>;
          }
        }
  },
  {
    field: "products",
    headerName: "Products",
    width: 3000,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          {params.row.products.map((p,i)=>(
            p.extras[0]?
            (<><img className={styles.cellImg} src={p.product?.img} alt="avatar" />{`${p.amount} (${p.size}) ${p.product?.title} with ${p.extras[0]}`}&nbsp;&nbsp;&nbsp;</>)
            :(<><img className={styles.cellImg} src={p.img} alt="avatar" />{`${p.amount} (${p.size}) ${p.title}`}&nbsp;&nbsp;&nbsp;</>)))}
        </div>
        );
    },
  },
];

