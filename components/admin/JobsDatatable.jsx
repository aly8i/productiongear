import styles from "../../styles/adminDatatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { jobColumns } from "./datatablesource";
import axios from "axios";
import { useState,useEffect } from "react";
import Link from "next/link";
import Search from "../Search";
const JobsDatatable = ({jobs,token}) => {
  const originalJobs = jobs;
  const [rows, setRows] = useState(originalJobs);
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
        return row.title.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    }else{
      setRows(originalJobs)
    }
    
  };

  const handleDelete = async (id) => {
    setRows(rows.filter((item) => item._id !== id));
    const res = await server.delete("api/jobs/" + id);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link href={`/jobs/edit/${params.row._id}`} passHref style={{ textDecoration: "none" }}>
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
          <Link href="/jobs/add" passHref >
            <span className={styles.link}>Add New</span>
          </Link>
        </div>
          <DataGrid
            className={styles.datagrid}
            getRowId={(row) => row._id}
            rows={rows}
            columns={jobColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection={false}
          />
      </div>
  );
};

export default JobsDatatable;