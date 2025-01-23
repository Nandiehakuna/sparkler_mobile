import { View, TouchableOpacity, Linking, StyleSheet } from 'react-native';

import { InstagramIcon, LinkIcon, TikTokIcon, YoutubeIcon } from './icons';
import { User } from '../contexts/UsersContext';
import { JSX } from 'react/jsx-runtime';

const UserCardIcon = ({ icon, url }: { icon: JSX.Element; url?: string }) => {
  if (!url) return null;

  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.icon}>
      {icon}
    </TouchableOpacity>
  );
};

export default ({ youtube, tiktok, instagram, customLink }: User) => {
  const socialLinks: { icon: JSX.Element; url?: string }[] = [
    { icon: <YoutubeIcon />, url: youtube },
    { icon: <TikTokIcon />, url: tiktok },
    { icon: <InstagramIcon />, url: instagram },
    { icon: <LinkIcon />, url: customLink },
  ];

  const linksCount: number = socialLinks.filter((link) => link.url).length;

  if (!linksCount) return null;

  return (
    <View style={[styles.container, linksCount === 1 && styles.singleIconContainer]}>
      {socialLinks.map((link, index) => (
        <UserCardIcon {...link} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  icon: {
    padding: 5,
  },
  singleIconContainer: {
    paddingHorizontal: 10,
  },
});
