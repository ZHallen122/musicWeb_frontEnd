import React, {useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import GetAppIcon from '@mui/icons-material/GetApp';
import PauseIcon from '@mui/icons-material/Pause';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltSharpIcon from '@mui/icons-material/ThumbDownAltSharp';
import {Slider, Stack, Toolbar} from '@mui/material';
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {VolumeDown, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled} from '@mui/material/styles';

export default function PlayMusicBar(props) {
    const [audio, setAudio] = useState(null);
    const [play, setPlay] = React.useState(true);
    const musicUrl = props.music;
    const [curTime, setCurTime ] = React.useState(0);
    const [value, setValue] = React.useState(30);
    const [position, setPosition] = React.useState(32);
    const [duration,setDuration] = React.useState(0);

    function formatDuration(value) {
        const seconds = Math.floor(value);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds - minutes * 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (audio) {
            audio.volume = newValue / 100;
        }
    };

    const theme = createTheme({
        components: {
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: '#fff'
                    }
                }
            }
        }
    });

    const handleSliderChange = (event, newValue) => {
        setPosition(newValue);
        if (audio) {
            audio.currentTime = newValue;
        }
    };

    const togglePlay = () => {
        setPlay(!play);
        if (audio) {
            if (!play) {
                audio.pause();
            } else {
                audio.play();
            }
        }else {
            playMusic();
        }
    };

    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
    });

    const playMusic = () => {
        if (audio) {
            // Stop the currently playing audio
            audio.pause();
        }
        const newAudio = new Audio(musicUrl);
        if (play) {
            newAudio.play();
            setDuration(newAudio.duration);
        }
        newAudio.addEventListener('timeupdate', () => {
            setCurTime(newAudio.currentTime);
            setPosition(newAudio.currentTime);
        });
        newAudio.addEventListener('loadedmetadata', () => {
            setDuration(newAudio.duration);
        });
        console.log('duration: ',duration);
        setAudio(newAudio);
        setCurTime(newAudio.currentTime)
    };



    return (
        <ThemeProvider>
            <Toolbar sx={{ bgcolor: '#101F33' }}>
                <SkipPreviousIcon sx={{ color: '#fff' }}/>

                <Button onClick={togglePlay}>
                    {play ? (
                        <PauseIcon sx={{ color: "#fff" }} />
                    ) : (
                        <PlayArrowIcon sx={{ color: "#fff" }} />
                    )}
                </Button>

                <IconButton>
                    <SkipNextIcon sx={{ color: '#fff' }}/>
                </IconButton>

                <TinyText sx={{ color: '#fff' }}>{formatDuration(position)}</TinyText>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    min={0}
                    step={1}
                    value={position}
                    onChange={handleSliderChange}

                    sx={{
                        color: '#fff',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                    theme.palette.mode === 'dark'
                                        ? 'rgb(255 255 255 / 16%)'
                                        : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}

                />
                <TinyText sx={{ color: '#fff' }}>{formatDuration(duration)}</TinyText>

                <Box sx={{ ml: 'auto' }}>
                    <IconButton sx={{ marginLeft: 'auto' }}>
                        <ThumbUpRoundedIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </Box>

                <IconButton sx={{ mr: 1 }}>
                    <ThumbDownAltSharpIcon sx={{ color: '#fff', mr: 1 }} />
                </IconButton>

                <Box sx={{ width: 200, ml: 1 }}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <VolumeDown sx={{ color: '#fff' }} />
                        <Slider aria-label="Volume" value={value} onChange={handleChange} />
                        <VolumeUp sx={{ color: '#fff' }} />
                    </Stack>
                </Box>

                <IconButton>
                <GetAppIcon  sx={{ color: '#fff', ml: 1 }}/>
                </IconButton>

            </Toolbar>
        </ThemeProvider>
    );
}

