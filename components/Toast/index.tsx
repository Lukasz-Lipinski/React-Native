import { Dispatch, FC, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { AppColors } from '../../styles';

export interface ToastDetails {
  type: 'ERROR' | 'INFO';
  msg: string;
  isShowed: boolean;
}

export interface ToastProps {
  type: 'ERROR' | 'INFO';
  msg: string;
  hideToast: Dispatch<ToastDetails>;
}

export const Toast: FC<ToastProps> = ({
  msg,
  type,
  hideToast,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast({
        type: 'INFO',
        msg: '',
        isShowed: false,
      });
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.toastBody}>
        <Text
          style={{
            ...styles.text,
            color:
              type === 'ERROR'
                ? AppColors.red
                : AppColors.green,
          }}
        >
          {msg}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  toastBody: {
    alignItems: 'center',
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
