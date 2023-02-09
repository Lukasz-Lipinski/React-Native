import {
  StyleSheet,
  Switch,
  View,
  Text,
} from 'react-native';
import { AppColors } from '../../styles';

interface TogglerProps {
  formType: boolean;
  onToggle: () => void;
}

export const Toggler = ({
  formType,
  onToggle,
}: TogglerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Switch on{' '}
        <Text style={styles.innerParagraph}>
          {formType
            ? 'Login'
            : 'Create an account'}
        </Text>
      </Text>
      <Switch
        value={formType}
        trackColor={{
          false: AppColors.light,
          true: AppColors.light,
        }}
        thumbColor={AppColors.dark}
        onValueChange={() => onToggle()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
  },
  innerParagraph: {
    color: AppColors.blue,
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
