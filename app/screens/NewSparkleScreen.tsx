import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ErrorMessage } from '../components/forms';
import { Avatar, Screen } from '../components';
import { ScreenProps } from '../utils/types';
import { useImages, useUser } from '../hooks';
import colors from '../config/colors';
import Header from '../components/screen/Header';
import sparklesApi from '../api/sparkles';
import ImageInputList from '../components/ImageInputList';

export default ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { user } = useUser();
  const {
    addImage,
    deleteImages,
    images,
    removeImage,
    removeImages,
    saveImages,
  } = useImages();

  const sparkleButtonDisabled = (!text.length && !images.length) || loading;

  const handleSparkle = async () => {
    if (sparkleButtonDisabled) return;
    if (error) setError('');

    setLoading(true);
    const imagesUrl = await saveImages();
    if (images.length && !imagesUrl.length) {
      setError('Error saving images');
      setLoading(false);
      return;
    }
    const res = await sparklesApi.createSparkle({ images: imagesUrl, text });
    setLoading(false);

    if (res.ok) {
      // TODO: Toast for a sparkle success
      setText('');
      removeImages();
      navigation.goBack();
    } else {
      setError(res.problem);
      deleteImages(imagesUrl);
    }
  };

  return (
    <Screen style={styles.container}>
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
            <TextInput
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.primary,
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
