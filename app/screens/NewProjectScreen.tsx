import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ActivityIndicator, Text } from '../components';
import { DataError } from '../api/client';
import { ErrorMessage, Form, FormField, FormPicker, SubmitButton } from '../components/forms';
import { PickerItem } from '../components/Picker';
import { ScreenProps } from '../utils/types';
import { useProjects, useTheme, useToast, useUser } from '../hooks';
import Header from '../components/screen/Header';

const schema = Yup.object().shape({
  description: Yup.string().min(3).max(255).optional().label('Description'),
  mention: Yup.string().min(3).max(100).required().label('Mentions'),
  name: Yup.string().min(3).max(100).required().label('Name'),
  partnership: Yup.object().required().nullable().label('Partnership'),
  stage: Yup.object().required().nullable().label('Project Stage'),
  tech: Yup.string().min(3).max(255).optional().label('Tech'),
  url: Yup.string().min(5).max(100).optional().label('URL'),
});

export type Project = Yup.InferType<typeof schema>;

const stages: PickerItem[] = [
  { label: 'Idea', id: 'Idea', icon: 'head-lightbulb' },
  { label: 'Development', id: 'Development', icon: 'laptop' },
  { label: 'Production', id: 'Production', icon: 'web-check' },
];

interface Partnership extends PickerItem {
  id: 'yes' | 'no';
}

const partnership: Partnership[] = [
  { label: 'Yes, I need a partner', id: 'yes', icon: 'thumb-up' },
  { label: 'No, I am Good', id: 'no', icon: 'thumb-down' },
];

export default ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { saveProject } = useProjects();
  const { theme } = useTheme();
  const { user } = useUser();
  const toast = useToast();

  const handleSubmit = async (
    { name, partnership, stage, ...other }: Project,
    { resetForm }: FormikHelpers<object>
  ) => {
    if (error) setError('');
    if (!user) return toast.show('Login to sparkle', 'error');

    setLoading(true);
    const res = await saveProject({
      name,
      partnership: (partnership as Partnership).id === 'yes',
      stage: (stage as PickerItem).label,
      ...other,
    });
    setLoading(false);

    if (res.ok) {
      resetForm();
      toast.show('Project is saved successfully', 'success');
      navigation.goBack();
    } else {
      toast.show('Failed to save project', 'error');
      setError((res.data as DataError).error || 'Something failed');
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Header buttonTitle="Save" disable loading={loading} onButtonPress={() => {}} />
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Form
          initialValues={{ name: '', tech: '', url: '', description: '', mention: '' }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Text style={styles.title}>New Project</Text>
          <ErrorMessage error={error} visible={!!error} />
          <FormField name="name" autoFocus placeholder="Name" />
          <FormField name="tech" placeholder="Technology used" />
          <FormField name="url" placeholder="URL or link" />
          <FormField name="mention" placeholder="@Mention Partners" />
          <FormField name="description" placeholder="Description" />
          <FormPicker
            icon="code-tags"
            items={stages}
            name="stage"
            numberOfColumns={stages.length}
            placeholder="Project Stage"
          />
          <FormPicker
            icon="handshake"
            items={partnership}
            name="partnership"
            numberOfColumns={partnership.length}
            placeholder="Project Partnership"
          />
          <SubmitButton title={loading ? 'Saving Project...' : 'Save'} />
        </Form>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
});
