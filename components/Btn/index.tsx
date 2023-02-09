import { useMemo } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { AppColors } from '../../styles';

interface BtnProps {
  onPressFunction: () => void;
  label: string;
  btnColor?: string;
  labelColor?: string;
  borderColor?: string;
  disabled?: boolean;
  isErrorBtn?: boolean;
  fontSize?: number;
  padding?: number;
}

export const Btn = ({
  onPressFunction,
  label,
  btnColor,
  borderColor,
  labelColor,
  disabled = false,
  isErrorBtn = true,
  fontSize = 18,
  padding = 20,
}: BtnProps) => {
  const onPress = () => {
    onPressFunction();
  };

  const isDisabled = useMemo(
    () => disabled,
    [disabled]
  );

  const btnStyle = useMemo(() => {
    const disabledColor =
      isDisabled && isErrorBtn
        ? AppColors.red
        : btnColor;
    return {
      label,
      btnColor,
      backgroundColor: disabledColor,
      borderWidth: borderColor ? 2 : 0,
      borderColor,
      labelColor,
      disabled,
      isErrorBtn,
      fontSize,
      padding,
      borderRadius: 12,
    };
  }, []);

  return (
    <Pressable
      disabled={isDisabled}
      style={btnStyle}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.label,
          fontSize: fontSize,
          color:
            isDisabled && isErrorBtn
              ? AppColors.white
              : labelColor,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
});
