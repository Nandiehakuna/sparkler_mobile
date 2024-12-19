import { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { EmbeddedSparkle } from '../components/sparkle';
import { ErrorMessage } from '../components/forms';
import { ScreenProps, SparkleActivity } from '../utils/types';
import { UserIcon } from '../components/icons';
import { useImages, useQuote, useUser } from '../hooks';
import colors from '../config/colors';
import Header from '../components/screen/Header';
import ImageInputList from '../components/ImageInputList';
import TextInput from '../components/TextInput';

export default ({ route, navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const { user } = useUser();
  const helper = useQuote();
  const [error, setError] = useState('');
  const { addImage, deleteImages, images, removeImage, saveImages } =
    useImages();

  const buttonDisabled = (!quote.length && !images.length) || loading;
  const sparkle: SparkleActivity = route.params;

  const saveQuote = async () => {
    if (!user || buttonDisabled) return;
    if (error) setError('');

    setLoading(true);
    const imagesUrl = await saveImages();
    if (images.length && !imagesUrl.length) {
      setError('Error saving images');
      setLoading(false);
      return;
    }

    const res = await helper.handleQuote({
      images: imagesUrl,
      text: quote,
      quoted_activity: sparkle,
    });
    setLoading(false);

    if (res.ok) {
      //TODO: notify user for a success comment
      setQuote('');
      navigation.goBack();
    } else {
      setError('Comment not sent!');
      deleteImages(imagesUrl);
    }
  };

  return (
    <View>
      <Header
        buttonTitle="Quote"
        disable={buttonDisabled}
        loading={loading}
        onButtonPress={saveQuote}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.image} />
          ) : (
            <View style={styles.userIcon}>
              <UserIcon size={styles.image.height} color={colors.white} />
            </View>
          )}

          <View style={styles.inputSection}>
            <ErrorMessage error={error} visible={Boolean(error.length)} />
            <TextInput
              autoFocus
              placeholder="What’s sparkling?"
              value={quote}
              onChangeText={setQuote}
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
        <EmbeddedSparkle activity={sparkle} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  container: {
    backgroundColor: colors.white,
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
  quoteContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
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
