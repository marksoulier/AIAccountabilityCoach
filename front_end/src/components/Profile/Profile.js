import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Switch, FormControlLabel, Button, Box } from '@mui/material';
import { updateUserProfile } from '../../actions/profileActions';
import { updateUserPreferences } from '../../actions/preferencesActions';

const Profile = () => {
    const dispatch = useDispatch();
    const { preferences, profile } = useSelector(state => ({
        preferences: state.preferences.preferences,
        profile: state.profile.profile
    }));

    // Initialize state with profile data
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    });
    const [preferencesData, setPreferencesData] = useState({
        dark_mode: false
    });

    useEffect(() => {
        if (profile) {
            setProfileData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                email: profile.email || '',
                username: profile.username || ''
            });
        }
        if (preferences) {
            setPreferencesData({
                dark_mode: preferences.dark_mode || false
            });
        }
    }, [profile, preferences]);

    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangePreferences = (e) => {
        const { name, checked } = e.target;
        setPreferencesData(prevData => ({
            ...prevData,
            [name]: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(profileData));
        dispatch(updateUserPreferences(preferencesData));
    };


    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleChangeProfile}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleChangeProfile}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChangeProfile}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={profileData.username}
                    onChange={handleChangeProfile}
                    margin="normal"
                />
                <FormControlLabel
                    control={<Switch checked={preferencesData.dark_mode} onChange={handleChangePreferences} name="dark_mode" />}
                    label="Dark Mode"
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
                    Save Changes
                </Button>
            </Box>
        </div>
    );
};

export default Profile;
