import { FC } from 'react';
import { Layout } from '../components/Layout';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  VirtualizedList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Paragraph: FC<{
  name: string;
  desc: string;
}> = ({ name, desc }) => {
  return (
    <Text style={styles.p}>
      Press icon:{' '}
      <Icon
        name={name}
        size={36}
      />{' '}
      {desc}
    </Text>
  );
};

export const DashboardScreen: FC = () => {
  const paragraphs: {
    name: string;
    desc: string;
  }[] = [
    {
      name: 'md-cash-outline',
      desc: `to exchange your money`,
    },
    {
      name: 'md-person-circle-sharp',
      desc: 'to add your account number and provide money and currency',
    },
    {
      name: 'ios-wallet',
      desc: 'to spot all created wallets and generate a purchasing code',
    },
  ];

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          padding: 12,
        }}
      >
        <Text style={styles.header}>Hello!</Text>
        <Text style={styles.p}>
          This application enables you to exchange
          your money and pay in other currency.
          You can create a wallet and generate a
          special code to purchase what you want!
        </Text>
        {paragraphs.map((item) => (
          <Paragraph
            {...item}
            key={`${item.name}`}
          />
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  p: {
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: '900',
    padding: 32,
    textAlign: 'center',
  },
});
