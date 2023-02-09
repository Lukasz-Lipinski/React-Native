import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { AppColors } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export interface LinkProps {
  link: string;
  icon?: string;
  isText?: boolean;
  circle?: number;
  size?: number;
  bgColor?: string;
  padding?: number;
  iconSize?: number;
  iconColor?: string;
  isAvatar?: boolean;
}

export const Link: FC<LinkProps> = ({
  link,
  icon,
  iconColor = AppColors.primary,
  isText = true,
  circle = 0,
  size = 0,
  bgColor = AppColors.secondary,
  padding = 16,
  iconSize = 32,
  isAvatar = false,
}) => {
  const navigation = useNavigation<{
    navigate: (param: string) => void;
  }>();

  return (
    <Pressable
      style={{
        ...styles.btn,
        borderRadius: circle,
        flex: size,
        backgroundColor: bgColor,
        padding: padding,
        position: 'relative',
      }}
      onPress={() => navigation.navigate(link)}
    >
      <View
        style={{
          left: (isAvatar && 1) || 0,
          bottom: (isAvatar && -1) || 0,
        }}
      >
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        )}
        {isText && (
          <Text style={styles.btnText}>
            {link}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    color: AppColors.primary,
  },
});
