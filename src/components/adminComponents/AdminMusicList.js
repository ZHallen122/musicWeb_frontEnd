import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import {getAllMusic} from "../../apis/utils";
import {DeleteMusic} from "../../apis/utils";
import PlayMusicBar from "../PlayMusicBar";
import AdminAddMusicForm from "./AdminAddMusicForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const test = [
    { label: 'The Shawshank Redemption', year: 1994 }
];


export default function AdminMusicList() {
    const[musicData,setMusicData] = useState([]);
    const [loadingRest, setLoadingRest] = useState(false);
    const [clickDelete,setDelete] = useState(false);
    const [clickPlayMusic,setPlayMusic] = useState(false);
    const [music,setMusic] = useState("");

    const handleMusic = (item) => {
        console.log(item)
        setMusic(item);
    };

    const onDeleteButtonClick = (e, row) => {
        e.stopPropagation();
        setDelete(row);
        console.log(row.id);
        DeleteMusic(row.id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'picUrl',
            headerName: 'Music',
            width: 130 ,
            renderCell: (params) => {
                const testMusic = (url) =>{
                    const audio = new Audio(url);
                    audio.play();
                    console.log('Playing music:', url);
                }

                return (
                    <Button onClick={handleMusic(params.row.musicUrl)}>
                    <img src={params.row.picUrl} alt="Music Picture" width="100" height="100"/>
                    </Button>
                );
            }},
        { field: 'name', headerName: 'Name', width: 130 },
        {field: 'types', headerName: 'type', type: 'number', width: 90,},
        {field: 'introduction', headerName: 'Introduction', width: 300},
        {field: 'musicUrl', headerName: 'musicUrl', width: 0},
        {field: 'moreInfomation', headerName: 'More Information', width: 130},
        {
            field: 'Operation',
            headerName: 'Operation',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <Button
                        color="error"
                        onClick={(e) => onDeleteButtonClick(e, params.row)}
                        variant="contained"
                    >
                        Delete
                    </Button>
                );
            }
        },
    ];

    const rows = musicData.map(item => {
        return {
            id: item.music.id,
            singer_id: item.music.singer_id,
            name: item.music.name,
            introduction: item.music.introduction,
            types: item.music.types,
            picUrl: item.picUrl,
            musicUrl: item.musicUrl
        };
    });


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
        <div >

            <Autocomplete
                disablePortal
                id="searchUserAutocomplete"
                options={test}
                sx={{ width: 200}}
                renderInput={(params) => <TextField {...params} label="Search User" />}
            />

            <AdminAddMusicForm/>


            <Toolbar>
                <div style={{ height: 400, width: '100%', marginTop: 60}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        // checkboxSelection
                    />
                </div>
            </Toolbar>

            <PlayMusicBar music={music}/>
        </div>
    );
}
