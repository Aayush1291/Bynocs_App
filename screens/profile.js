import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';

const Profile = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        retrieveUserName();
        retrieveEmail();
        retrieveProfilePhoto();
    }, []);

    const retrieveUserName = async () => {
        try {
            const storedUserName = await AsyncStorage.getItem('UserName');
            if (storedUserName) {
                setUserName(storedUserName);
            }
        } catch (error) {
            console.error('Error retrieving userName from AsyncStorage:', error);
        }
    };

    const retrieveEmail = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('Email');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        } catch (error) {
            console.error('Error retrieving role from AsyncStorage:', error);
        }
    };

    const retrieveProfilePhoto = async () => {
        try {
            const storedProfilePhoto = await AsyncStorage.getItem('ProfilePhoto');
            if (storedProfilePhoto) {
                setProfilePhoto(storedProfilePhoto);
            }
        } catch (error) {
            console.error('Error retrieving profile photo from AsyncStorage:', error);
        }
    };

    const handleProfilePhotoSelection = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            cropperCircleOverlay: false,
            cropperCancelText: 'Cancel',
            cropperChooseText: 'Choose',
            cropperToolbarTitle: 'Crop your photo',
        }).then(response => {
            if (!response.didCancel) {
                // Set the selected profile photo URI to the state
                setProfilePhoto(response.path);

                // Save the selected profile photo URI in AsyncStorage
                saveProfilePhoto(response.path);
            }
        }).catch(error => {
            console.log('ImageCropPicker Error:', error);
        });
    };

    const saveProfilePhoto = async (uri) => {
        try {
            await AsyncStorage.setItem('ProfilePhoto', uri);
        } catch (error) {
            console.error('Error saving profile photo to AsyncStorage:', error);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handleProfilePhotoSelection}>
                {profilePhoto ? (
                    <Image
                        source={{ uri: profilePhoto }}
                        style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginTop: responsiveHeight(15) }}
                    />
                ) : (
                    <Avatar.Icon
                        size={100}
                        icon="account-circle"
                        style={{ alignSelf: 'center', marginTop: responsiveHeight(15) }}
                    />
                )}
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 35, color: 'black', marginTop: responsiveHeight(5) }}>{username}</Text>
            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', marginTop: responsiveHeight(3) }}>{email}</Text>
        </View>
    )
}

export default Profile;
