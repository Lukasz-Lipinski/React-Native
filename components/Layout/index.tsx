import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { TopNav } from '../TopNav';
import { BottomNav } from '../BottomNav';
import { FC, ReactNode, useContext } from 'react';
import { AppColors } from '../../styles';
import { FormContext } from '../../ctx';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  children,
}) => {
  const { user } = useContext(FormContext);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
    >
      {user.isLogged && <TopNav />}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    flex: 1,
  },
  box: {},
});
