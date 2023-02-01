import styles from "../../styles/adminDatatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { equipmentColumns } from "./datatablesource";
import axios from "axios";
import { useState,useEffect } from "react";
import Link from "next/link";
import Search from "../Search";
const EquipmentsDatatable = ({equipments,token}) => {
  const originalEquipments = equipments;
  const [rows, setRows] = useState(originalEquipments);
  const [searched, setSearched] = useState("");
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  useEffect(()=>{
    requestSearch(searched);
},[searched])
  useEffect(()=>{
    server.interceptors.request.use(
      async function (config) {
        const accessToken =  token;
        if (accessToken) {
          config.headers.authorization = accessToken;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
  },[])


  const requestSearch = (searchedVal) => {
    if(searchedVal!=""){
      const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    }else{
      setRows(originalEquipments)
    }
    
  };

  const handleDelete = async (id) => {
    setRows(rows.filter((item) => item._id !== id));
    const res = await server.delete("api/equipments/" + id);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link href={`/equipments/edit/${params.row._id}`} passHref style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </Link>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
      <div className={styles.datatable}>
        <div className={styles.datatableTitle}>
          <div className={styles.search}>
            <Search setSearched={setSearched} searched={searched}/>
          </div>
          <Link href="/equipments/add" passHref >
            <span className={styles.link}>Add New</span>
          </Link>
        </div>
          <DataGrid
            className={styles.datagrid}
            getRowId={(row) => row._id}
            rows={rows}
            columns={equipmentColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection={false}
          />
      </div>
  );
};

export default EquipmentsDatatable;