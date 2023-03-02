import { useEffect, useState } from 'react';
import { useAuth, upload } from '../../firebase';
import { Avatar, Stack, Badge, styled, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Add } from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export const ProfileAvatar = () => {
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState(
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    );

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function handleClick() {
        upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    return (
        <Grid container sx={{ textAlign: 'left' }}>
            <input
                style={{ visibility: 'hidden' }}
                id="actual-btn"
                type="file"
                onChange={handleChange}
            />

            <label for="actual-btn">
                <AddIcon />
            </label>

            <button disabled={loading || !photo} onClick={handleClick}>
                <FileUploadIcon />
            </button>

            <Badge
                sx={{ justifyContent: 'space-around' }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Avatar alt="Avatar" src={photoURL} />
            </Badge>
        </Grid>
    );
};
