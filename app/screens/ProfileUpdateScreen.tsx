import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { FormikHelpers } from 'formik';
import Icon from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { ActivityIndicator, Image, Text } from '../components';
import { DataError } from '../api/client';
import { FormField, Form, ErrorMessage, SubmitButton } from '../components/forms';
import { getActorFromUser } from '../utils/funcs';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useTheme, useToast, useUser } from '../hooks';
import colors from '../config/colors';
import filesStorage from '../storage/files';
import Header from '../components/screen/Header';
import usersApi from '../api/users';

const schema = Yup.object().shape({
  name: Yup.string().min(1).max(100).required().label('Name'),
  bio: Yup.string().max(255).label('Bio'),
  youtube: Yup.string().url('Please enter a valid YouTube URL').label('YouTube'),
  linkedIn: Yup.string().url('Please enter a valid LinkedIn URL').label('LinkedIn'),
  instagram: Yup.string().url('Please enter a valid Instagram URL').label('Instagram'),
  customLink: Yup.string().url('Please enter a valid URL').label('Custom Link'),
});

type Info = Yup.InferType<typeof schema>;

export default ({ navigation }: ScreenProps) => {
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

      const { profileImage, coverImage } = user;
      setCoverImage(coverImage || '');
      setProfileImage(profileImage || '');
    };

    initUserInfo();
  }, []);

  function getInitialValues(): object {
    const { name, bio, customLink, instagram, youtube, linkedIn } = user;

    return {
      name,
      bio: bio || '',
      youtube: youtube || '',
      linkedIn: linkedIn || '',
      instagram: instagram || '',
      customLink: customLink || '',
    };
  }

  const handleSubmit = async (details: Info, { resetForm }: FormikHelpers<object>) => {
    if (isLoading) return;

    setIsLoading(true);
    let uploadedProfileImageUrl = user?.profileImage || '';
    if (profileImage && user.profileImage !== profileImage) {
      uploadedProfileImageUrl = await filesStorage.saveFile(profileImage);
      if (user?.profileImage && !user.profileImage.includes('googleusercontent'))
        filesStorage.deleteImage(user.profileImage);
    }

    let uploadedCoverImageUrl = user?.coverImage || '';
    if (coverImage && user.coverImage !== coverImage) {
      uploadedCoverImageUrl = await filesStorage.saveFile(coverImage);
      if (user.coverImage) filesStorage.deleteImage(user.coverImage);
    }

    const newInfo = {
      profileImage: uploadedProfileImageUrl,
      coverImage: uploadedCoverImageUrl,
      ...details,
    };
    const { ok, data } = await usersApi.update(newInfo);
    setIsLoading(false);

    if (ok) {
      toast.show('Your info is updated successfully', 'success');
      navigation.navigate(routes.PROFILE, getActorFromUser({ ...user, ...newInfo }));
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

  const cancelUpdate = () => navigation.navigate(routes.PROFILE);

  if (!user)
    return (
      <View>
        <Text>You're not logged in</Text>
      </View>
    );

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Header onCancelPress={cancelUpdate} showButton={false} />

      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <Form initialValues={getInitialValues()} onSubmit={handleSubmit} validationSchema={schema}>
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

          <FormField name="name" placeholder="Name" />
          <FormField multiline name="bio" numberOfLines={4} placeholder="Bio" />
          <FormField name="customLink" placeholder="Custom Link" keyboardType="url" />
          <FormField name="youtube" placeholder="YouTube" keyboardType="url" />
          <FormField name="linkedIn" placeholder="LinkedIn" keyboardType="url" />
          <FormField name="instagram" placeholder="Instagram" keyboardType="url" />
          <SubmitButton title="Update Profile" />
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
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
