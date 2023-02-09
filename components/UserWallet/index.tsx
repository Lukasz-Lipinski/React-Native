import { Picker } from '@react-native-picker/picker';
import { FC, useContext, useState } from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../styles';
import { FormContext } from '../../ctx';
import { checkIsNumber } from '../../services';
import { Toast, ToastDetails } from '../Toast';

interface UserWalletProps {}

export const UserWallet: FC<
  UserWalletProps
> = () => {
  const { setBudget, user } =
    useContext(FormContext);

  const [showWallet, setShowWallet] =
    useState<boolean>(false);
  const [toast, setToast] =
    useState<ToastDetails>({
      isShowed: false,
      msg: '',
      type: 'INFO',
    });

  const currency: string[] = [
    'EUR',
    'PL',
    'USD',
    'CZK',
    'GBP',
    'NOK',
  ];

  const [currentCurrency, setCurrentCurrency] =
    useState<string>(currency[0]);
  const [currentAmount, setCurrentAmount] =
    useState<number>(0);

  const onSetCurrency = (value: string) => {
    setCurrentCurrency(value);
  };

  const onSetCurrentAmount = (value: string) => {
    checkIsNumber(value) &&
      +value > 1 &&
      setCurrentAmount(+value);
    !checkIsNumber(value) &&
      setToast({
        isShowed: true,
        msg: 'Number should be assigned',
        type: 'ERROR',
      });
  };

  const onAllocateToWallet = () => {
    setBudget({
      amount: currentAmount,
      currency: currentCurrency,
    });
    setToast({
      isShowed: true,
      msg: 'Money assigned',
      type: 'INFO',
    });
  };

  return (
    <>
      <View style={{ marginBottom: 24 }}>
        <Button
          disabled={user.accountNo ? false : true}
          title='Your wallet'
          color={AppColors.blue}
          onPress={() => setShowWallet(true)}
        />
      </View>
      <Modal
        visible={showWallet}
        animationType='slide'
      >
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.blue,
          }}
        >
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name='ios-wallet'
                size={52}
                color={AppColors.white}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  color: AppColors.white,
                }}
              >
                Your Wallet
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  padding: 12,
                  color: AppColors.white,
                }}
              >
                Setup your base currency
              </Text>
              <Picker
                selectedValue={currentCurrency}
                onValueChange={onSetCurrency}
                style={{
                  backgroundColor: 'white',
                }}
              >
                {currency.map((curr, index) => (
                  <Picker.Item
                    key={`${curr}-${index}`}
                    label={curr}
                    value={curr}
                    style={{
                      fontWeight: 'bold',
                      backgroundColor: 'white',
                    }}
                  />
                ))}
              </Picker>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text
                style={{
                  fontSize: 20,
                  padding: 6,
                  color: AppColors.white,
                }}
              >
                Allocate money to your wallet
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onSetCurrentAmount}
              />
            </View>
          </View>
          <View style={{ marginVertical: 24 }}>
            <Button
              title='Save'
              color={AppColors.green}
              onPress={onAllocateToWallet}
            />
          </View>
          <View>
            <Button
              title='Cancel'
              color={AppColors.red}
              onPress={() => setShowWallet(false)}
            />
          </View>
        </View>
        {toast.isShowed && (
          <Toast
            {...toast}
            hideToast={setToast}
          />
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  input: {
    borderRadius: 6,
    backgroundColor: AppColors.white,
    padding: 12,
    fontSize: 18,
  },
});
