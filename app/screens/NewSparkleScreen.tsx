import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import { ActivityIndicator, Avatar } from '../components';
import { ErrorMessage } from '../components/forms';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useImages, useSparkle, useTheme, useToast, useUser } from '../hooks';
import AppTextInput from '../components/TextInput';
import colors from '../config/colors';
import Header from '../components/screen/Header';
import ImageInputList from '../components/ImageInputList';

export default ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { addImage, deleteImages, images, removeImage, removeImages, saveImages } = useImages();
  const { theme } = useTheme();
  const { user } = useUser();
  const toast = useToast();
  const helper = useSparkle();

  const sparkleButtonDisabled = (!text.length && !images.length) || loading;

  const handleSparkle = async () => {
    if (!user) return toast.show('Login to sparkle', 'error');
    if (sparkleButtonDisabled) return;
    if (error) setError('');
    Keyboard.dismiss();

    setLoading(true);
    const imagesUrl = await saveImages();
    if (images.length && !imagesUrl.length) {
      setError('Error saving images');
      setLoading(false);
      return;
    }
    const res = await helper.sparkle({ images: imagesUrl, text });
    setLoading(false);

    if (res.ok) {
      toast.show('Sparkle is sent! Press to view it from your profile', 'success', {
        onPress: () => navigation.navigate(routes.PROFILE),
        animationType: 'slide-in',
      });
      setText('');
      removeImages();
      navigation.goBack();
    } else {
      toast.show('You could not sparkle! Something failed', 'error');
      setError(res.problem);
      deleteImages(imagesUrl);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          buttonTitle="Sparkle"
          disable={sparkleButtonDisabled}
          loading={loading}
          onButtonPress={handleSparkle}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <Avatar image={user?.profileImage} style={styles.image} />

            <View style={styles.inputSection}>
              <ErrorMessage error={error} visible={Boolean(error.length)} />
              <AppTextInput
                autoFocus
                placeholder="What’s sparkling?"
                value={text}
                onChangeText={setText}
                style={styles.textInput}
                placeholderTextColor={colors.medium}
                multiline
              />
              <ImageInputList
                imageUris={images}
                onAddImage={addImage}
                onRemoveImage={removeImage}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 20,
    height: 40,
    marginRight: 12,
    width: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
  },
  inputSection: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.light,
    paddingBottom: 8,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 10,
  },
  userIcon: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    padding: 15,
    width: 40,
  },
});
