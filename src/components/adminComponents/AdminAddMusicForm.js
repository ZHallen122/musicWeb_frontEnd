import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DropzoneArea } from "mui-file-dropzone";
import {AddMusic} from "../../apis/utils";

export default function AdminAddMusicForm(props){
    const [open, setOpen] = React.useState(false);
    const [musicFile, setMusicFile] = React.useState("");
    const [imageFile, setImageFile] = React.useState("");

    const [musicName, setMusicName] = React.useState('');
    const [singer, setSinger] = React.useState('');
    const [introduction, setIntroduction] = React.useState('');
    const [lyric, setlyric] = React.useState('');
    const [type, setType] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveImage = (files) => {
        setImageFile({
            files: files,
        });
    }

    const handleSaveMusic = (files) => {
        setMusicFile({
            files: files,
        });
    }

    const handleUpload = () => {
        const musicItem = {
            name: musicName,
            lyric: lyric,
            type: type,
            introduction: introduction,
            music: musicFile,
            pic: imageFile,
        };

        console.log(musicItem);
        AddMusic(musicItem)
            .then(

        ).catch(

        );
        setOpen(false);
    }


    return (
        <div>
        <Button variant="contained" style={{ position: 'absolute', left: 500, top: 200 }} onClick={() => setOpen(true)}>
            add Music
        </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Music</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Upload music please fill out all the blank that been star
                    </DialogContentText>
                    <TextField
                        required
                        label="Music Name"
                        variant="standard"
                        onChange={(event) => setMusicName(event.target.value)}
                    />

                    <TextField
                        required
                        label="Singer"
                        variant="standard"
                        onChange={(event) => setSinger(event.target.value)}
                    />


                    <TextField
                        id="outlined-multiline-static"
                        label="lyric"
                        multiline
                        rows={4}
                        onChange={(event) => setlyric(event.target.value)}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Introduction"
                        multiline
                        rows={4}
                        onChange={(event) => setIntroduction(event.target.value)}
                    />

                    <DropzoneArea
                        onSave={handleSaveImage}
                        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                        showPreviews={true}
                        maxFileSize={5000000}
                    />

                    <DropzoneArea
                        onSave={handleSaveMusic}
                        acceptedFiles={["audio/mpeg", "audio/wav", "audio/flac"]}
                        showPreviews={true}
                        maxFileSize={5000000}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={handleUpload}> Upload </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}