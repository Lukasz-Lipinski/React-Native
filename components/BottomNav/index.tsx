import { StyleSheet, View } from 'react-native';
import {
  Link,
  LinkProps,
} from '../Navigation/Link';

export const BottomNav = () => {
  const links: LinkProps[] = [
    {
      link: 'Exchange',
      icon: 'md-cash-outline',
    },
    { link: 'Wallets', icon: 'ios-wallet' },
  ];

  return (
    <View style={styles.container}>
      {links.map((link, index) => (
        <Link
          {...link}
          size={1}
          key={`${link}--${index}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
