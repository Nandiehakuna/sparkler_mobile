import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import { ActivityIndicator, Image, Text } from '../components';
import { FormField, Form, ErrorMessage } from '../components/forms';
import { useTheme, useToast, useUser } from '../hooks';
import { validationSchema, FormValues } from '../utils/validationSchema';
import colors from '../config/colors';
import filesStorage from '../storage/files';
import Header from '../components/screen/Header';
import usersApi from '../api/users';
import { ScreenProps } from '../utils/types';
import { DataError } from '../api/client';

const initialValues: FormValues = {
  name: '',
  bio: '',
  youtube: '',
  tiktok: '',
  instagram: '',
  customLink: '',
};

export default ({ navigation }: ScreenProps) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [instagram, setInstagram] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { user } = useUser();
  const toast = useToast();

  useEffect(() => {
    const initUserInfo = () => {
      if (!user) return;

      const { name, bio, customLink, instagram, youtube, tiktok, profileImage, coverImage } = user;
      setName(name);
      if (bio) setBio(bio);
      if (customLink) setCustomLink(customLink);
      if (instagram) setInstagram(instagram);
      if (youtube) setYoutube(youtube);
      if (tiktok) setTiktok(tiktok);
      if (coverImage) setCoverImage(coverImage);
      if (profileImage) setProfileImage(profileImage);
    };

    initUserInfo();
  }, []);

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!name) return setError('Name is required!');

    setIsLoading(true);
    let uploadedProfileImageUrl = '';
    if (user.profileImage !== profileImage && profileImage) {
      uploadedProfileImageUrl = await filesStorage.saveFile(profileImage);
      if (user?.profileImage && !user.profileImage.includes('googleusercontent'))
        filesStorage.deleteImage(user.profileImage);
    }

    let uploadedCoverImageUrl = '';
    if (user.coverImage !== coverImage && coverImage) {
      uploadedCoverImageUrl = await filesStorage.saveFile(coverImage);
      if (user.coverImage) filesStorage.deleteImage(user.coverImage);
    }

    const { ok, data } = await usersApi.update({
      name,
      bio,
      youtube,
      tiktok,
      instagram,
      customLink,
      profileImage: uploadedProfileImageUrl || profileImage,
      coverImage: uploadedCoverImageUrl || coverImage,
    });
    setIsLoading(false);

    if (ok) {
      toast.show('Your info is updated successfully', 'success');
      navigation.goBack();
    } else {
      toast.show('Error updating your info', 'error');
      setError((data as DataError).error || 'Something failed');
    }
  };

  const pickImage = async (setImage: (image: string) => void, isCoverImage?: boolean) => {
    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: isCoverImage ? [16, 9] : [1, 1],
      quality: 1,
    });

    if (!canceled && assets?.length > 0) setImage(assets[0].uri);
  };
  //TODO: Save updates
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Header buttonTitle="Update" disable={false} loading={isLoading} onButtonPress={() => {}} />
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={!!error} />
          <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
            {profileImage ? (
              <Image uri={profileImage} style={styles.profilePicture} />
            ) : (
              <View style={[styles.profilePicture, styles.placeholder]}>
                <Icon name="user" size={60} color={colors.white} />
              </View>
            )}
            <Text style={styles.editProfileText}>Edit profile picture</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pickImage(setCoverImage, true)}>
            {coverImage ? (
              <Image uri={coverImage} style={styles.coverImage} />
            ) : (
              <View style={[styles.coverImage, styles.placeholder]}>
                <Icon name="image" size={60} color={colors.medium} />
              </View>
            )}
            <Text style={styles.editProfileText}>Edit cover image</Text>
          </TouchableOpacity>

          <FormField
            name="name"
            onFormTextChange={setName}
            placeholder="Name"
            style={styles.input}
            value={name}
          />
          <FormField
            multiline
            name="bio"
            numberOfLines={4}
            onFormTextChange={setBio}
            placeholder="Bio"
            style={styles.inputBio}
            value={bio}
          />
          <FormField
            name="customLink"
            placeholder="Custom Link"
            style={styles.input}
            keyboardType="url"
            value={customLink}
            onFormTextChange={setCustomLink}
          />
          <FormField
            name="youtube"
            placeholder="YouTube"
            style={styles.input}
            keyboardType="url"
            value={youtube}
            onFormTextChange={setYoutube}
          />
          <FormField
            name="tiktok"
            placeholder="Tik Tok"
            style={styles.input}
            keyboardType="url"
            value={tiktok}
            onFormTextChange={setTiktok}
          />
          <FormField
            name="instagram"
            placeholder="Instagram"
            style={styles.input}
            keyboardType="url"
            value={instagram}
            onFormTextChange={setInstagram}
          />
        </Form>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  coverImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 150,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  editProfileText: {
    color: '#1DA1F2',
    marginTop: 10,
    fontSize: 12,
  },
  input: {
    backgroundColor: '#15202B',
    color: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  inputBio: {
    backgroundColor: '#15202B',
    color: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    textAlignVertical: 'top',
  },

  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
