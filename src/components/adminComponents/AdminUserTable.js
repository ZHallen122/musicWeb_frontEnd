import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import { getAllUser} from "../../apis/utils";

const columns: GridColDef[] = [
  { field: 'user_id', headerName: 'User ID', width: 150 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 70 },
  { field: 'phone_number', headerName: 'Phone Number',type: 'number', width: 150 },
  {
    field: 'create_time',
    headerName: 'CreateTime',
    type: 'number',
    width: 150,
  },
  {
    field: 'update_time',
    headerName: 'UpdateTime',
    type: 'number',
    width: 150,
  }
];

export default function AdminUserTable() {

  const[userData,setUserData] = useState([]);
  const [loadingRest, setLoadingRest] = useState(false);



  useEffect( () => {
    console.log("effect")
    setLoadingRest(true);
    getAllUser()
        .then((data)=>{
          setUserData(data.data);
        })
        .catch((err)=>{
        }).finally(() => {
      setLoadingRest(false);
    });
  },[]);


  return (
    <div style={{ height:400, width: '100%' }}>
      <DataGrid
        rows={userData}
        getRowId={(userData) => userData.user_id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
