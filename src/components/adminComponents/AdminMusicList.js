import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import {getAllMusic} from "../../apis/utils";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'pic', headerName: 'Music Picture', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
        field: 'type',
        headerName: 'type',
        type: 'number',
        width: 90,
    },{field: 'introduction', headerName: 'Introduction', width: 300},
    {field: 'moreInfomation', headerName: 'More Information', width: 130},
    {
        field: 'Operation',
        headerName: 'Operation',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export default function AdminMusicList() {
    const[musicData,setMusicData] = useState([]);
    const [loadingRest, setLoadingRest] = useState(false);


    const getMusicData = (data) => {
        console.log('getMusicData')
        setMusicData(data);

        console.log(musicData.id)
        console.log(musicData.MusicPicture)
        console.log(musicData.Name)
        console.log(musicData.type)
    }

    useEffect( () => {
        console.log("effect")
        setLoadingRest(true);
        getAllMusic()
            .then((data)=>{
                setMusicData(data.data);
            })
            .catch((err)=>{

            }).finally(() => {
            setLoadingRest(false);
        });
    },[]);

    return (
            <Toolbar>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={musicData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </Toolbar>
    );
}
