import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  FC,
  useContext,
  useMemo,
} from 'react';
import { FormContext } from '../ctx';
import { Wallet } from '../components/Wallet';
import { AppColors } from '../styles';

export const WalletsScreen: FC = () => {
  const { user } = useContext(FormContext);
  const { wallets } = user;

  const header = useMemo(
    () =>
      wallets.length
        ? 'Your wallets'
        : 'No created wallets',
    [wallets.length]
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={styles.header}>
          {header}
        </Text>
      </View>

      <FlatList
        data={wallets}
        renderItem={({ item }) => (
          <Wallet
            amount={item.amount}
            currency={item.currency}
          />
        )}
        keyExtractor={(wallet, index) =>
          `wallet-${wallet.currency}-${index}`
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: AppColors.lightPurple,
    flex: 1,
  },
  header: {
    padding: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },
});
