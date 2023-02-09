import { FC, useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  Link,
  LinkProps,
} from '../Navigation/Link';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../styles';
import { FormContext } from '../../ctx';
import { useNavigation } from '@react-navigation/native';

export const TopNav: FC = () => {
  const { setUser } = useContext(FormContext);
  const navigation = useNavigation<{
    navigate: (path: string) => void;
  }>();

  const links: LinkProps[] = [
    {
      link: 'Exchange',
      icon: 'md-cash-outline',
    },
    {
      link: 'Dashboard',
      icon: 'md-home',
    },
    {
      link: 'Account',
      icon: 'md-person-circle-sharp',
    },
    { link: 'Wallets', icon: 'ios-wallet' },
  ];

  const logout = () => {
    setUser({
      email: '',
      idToken: '',
      isLogged: false,
      wallets: [],
      accountNo: 0,
    });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            {...links[1]}
            isText={false}
            circle={10}
            bgColor={AppColors.yellow}
            iconColor={AppColors.primary}
          />
          <Link
            {...links[0]}
            isText={false}
            circle={10}
            bgColor={AppColors.yellow}
            iconColor={AppColors.primary}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <View
            style={{
              position: 'absolute',
              top: -10,
            }}
          >
            <Link
              {...links[2]}
              isText={false}
              circle={100}
              iconSize={56}
              padding={8}
              isAvatar
            />
          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Link
            {...links[3]}
            isText={false}
            circle={10}
            bgColor={AppColors.light}
            iconColor={AppColors.primary}
          />
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              borderRadius: 10,
            }}
            onPress={logout}
          >
            <Icon
              name='md-exit-outline'
              size={30}
              color={AppColors.primary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: AppColors.dark,
    backgroundColor: AppColors.light,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeIcon: {},
});
