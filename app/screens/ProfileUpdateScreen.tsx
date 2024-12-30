import { StyleSheet, ScrollView } from 'react-native';

import { FormField, Form } from '../components/forms';
import { validationSchema, FormValues } from '../utils/validationSchema';
import { Text } from '../components';

export default () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form Submitted:', values);
  };

  const initialValues: FormValues = {
    name: '',
    bio: '',
    youtube: '',
    tiktok: '',
    instagram: '',
    customLink: '',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* Name Field */}
        <FormField name="name" placeholder="Enter your name" label="Name" />

        {/* Bio Field */}
        <FormField
          name="bio"
          placeholder="Tell us about yourself"
          label="Bio"
          multiline
          numberOfLines={4}
        />

        {/* Links Section */}
        <Text style={styles.sectionHeader} useBoldFontFamily>
          Social Links
        </Text>

        <FormField
          name="youtube"
          placeholder="https://youtube.com/yourchannel"
          label="YouTube"
          keyboardType="url"
        />

        <FormField
          name="tiktok"
          placeholder="https://tiktok.com/@yourhandle"
          label="TikTok"
          keyboardType="url"
        />

        <FormField
          name="instagram"
          placeholder="https://instagram.com/yourhandle"
          label="Instagram"
          keyboardType="url"
        />

        <FormField
          name="customLink"
          placeholder="https://yourwebsite.com"
          label="Custom Link"
          keyboardType="url"
        />
      </Form>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000', // Dark background
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
});
