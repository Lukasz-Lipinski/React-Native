import { View, StyleSheet } from 'react-native';
import { SignInForm } from '../components/SignInForm';
import { FC } from 'react';
import { Layout } from '../components/Layout';

export const HomeScreen: FC = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <SignInForm />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
