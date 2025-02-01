import { ScrollView, View, StyleSheet } from 'react-native';

import { Text } from '../components';
import { useTheme } from '../hooks';
import colors from '../config/colors';

const AboutScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.scrollContainer, { backgroundColor: theme.colors.background }]}>
      <Text isBold style={styles.header}>
        About Sparkler
      </Text>

      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>
          Welcome to{' '}
          <Text isBold style={styles.highlight}>
            Sparkler
          </Text>
          , your go-to app for seamless communication and sharing of important updates. Sparkler is
          designed to reduce the clutter and hassle of multiple messages in different groups by
          providing a unified platform.
        </Text>

        <Text isBold style={styles.sectionTitle}>
          Our Mission
        </Text>
        <Text style={styles.paragraph}>
          At Sparkler, our mission is to make communication seamless and reduce the repetitive
          forwarding of messages by lecturers and authorities to various groups. With Sparkler, you
          have one place to find all the information you need, making staying informed effortless.
        </Text>

        <Text isBold style={styles.sectionTitle}>
          Why Sparkler?
        </Text>
        <Text style={styles.paragraph}>
          Instead of searching through endless chats, Sparkler gives you a single source of truth.
          Want to know what a particular person has said over time? Simply visit their profile to
          view all their sparkles (posts) in one place.
        </Text>

        <Text isBold style={styles.sectionTitle}>
          Key Features
        </Text>
        <Text style={styles.paragraph}>
          - Effortless sharing of photos, updates, and posts.
          {'\n'}- Discover trending content and follow your favorite creators or authorities.
          {'\n'}- Seamless and secure communication with an intuitive interface.
        </Text>

        <Text isBold style={styles.sectionTitle}>
          Contact Us
        </Text>
        <Text style={styles.paragraph}>
          We love hearing from our users! For feedback, support, or inquiries, please email us at{' '}
          <Text style={styles.highlight}>augustineawuori95@gmail.com</Text>.
        </Text>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Sparkler. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.blue,
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  highlight: {
    color: colors.blue,
  },
  footer: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AboutScreen;
