import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsSystemDaydreamSharpIcon from '@mui/icons-material/SettingsSystemDaydreamSharp';
import MicSharpIcon from '@mui/icons-material/MicSharp';
import LibraryMusicSharpIcon from '@mui/icons-material/LibraryMusicSharp';
import {useState} from "react";
import AdminMusicList from './AdminMusicList';
import AdminContent from "./AdminContent";
import Typography from "@mui/material/Typography";

const categories = [
    {
        id: 'Dashboard',
        children: [
            {
                id: 'System Main Page',
                icon: <SettingsSystemDaydreamSharpIcon />,
                active: true,
            },

        ],
    },
    {
        id: 'Management',
        children: [
            { id: 'UserControl', icon: <PeopleIcon /> },
            { id: 'MusicControl', icon: <LibraryMusicSharpIcon /> },
            { id: 'SingerControl', icon: <MicSharpIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function AdminNavigator(props) {
    const { ...other } = props;
    const [click,setClick] = useState(false);
    const [selected, setSelected] = useState('');

    const handleClick = (item) => {
        setClick(true);
        setSelected(item);
        console.log (selected);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Music-Web
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Project Overview</ListItemText>
                </ListItem>

                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton selected={active} sx={item} onClick={() => handleClick(childId)}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
        {click && (
            <div  >
                {selected === 'UserControl' && <AdminContent />}
                {selected === 'MusicControl' && <AdminMusicList />}
                {selected === 'SingerControl' && <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>}
            </div>
        )}
    </Box>
    );
}
