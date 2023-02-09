import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  FC,
  useContext,
  useState,
  Dispatch,
} from 'react';

import { FormContext } from '../../ctx';
import { AppColors } from '../../styles';
import { checkIsNumber } from '../../services';
import { ToastDetails } from '../Toast';

interface FormProps {
  onExchange: (
    currency: string,
    amount: number
  ) => void;
  setToast: Dispatch<ToastDetails>;
}

export const Form: FC<FormProps> = ({
  onExchange,
  setToast,
}) => {
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
  const { budget, setWallet } =
    useContext(FormContext);

  const onSetAmount = (value: string) => {
    checkIsNumber(value) &&
      setCurrentAmount(+value);
  };

  const onSetCurrency = (curr: string) => {
    setCurrentCurrency(curr);
  };

  const onAllocateToWallet = () => {
    if (
      currentAmount &&
      currentCurrency &&
      budget.amount >= currentAmount &&
      currentCurrency !== budget.currency
    ) {
      onExchange(currentCurrency, currentAmount);
      setWallet({
        amount: currentAmount,
        currency: currentCurrency,
      });
      setToast({
        isShowed: true,
        msg: 'Exchanged successfully',
        type: 'INFO',
      });
    } else {
      budget.amount < currentAmount &&
        setToast({
          isShowed: true,
          msg: 'Not enough money',
          type: 'ERROR',
        });

      currentCurrency === budget.currency &&
        setToast({
          isShowed: true,
          msg: 'You have not changed a currency',
          type: 'ERROR',
        });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                ...styles.input,
                color:
                  budget.amount < currentAmount
                    ? AppColors.red
                    : AppColors.dark,
              }}
              onChangeText={onSetAmount}
              placeholder='How much?'
            />
            <Text
              style={{
                ...styles.input,
                textAlign: 'center',
              }}
            >
              {budget.amount
                ? `${budget.amount} ${budget.currency}`
                : 'lack of money'}
            </Text>
          </View>
          <Text style={styles.p}>
            Choose currency
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
        <View style={styles.btnContainer}>
          <Button
            title='Exchange'
            color={AppColors.blue}
            onPress={onAllocateToWallet}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    position: 'relative',
  },
  inputsContainer: {
    marginTop: 32,
  },
  p: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 16,
  },
  input: {
    fontSize: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  btnContainer: {
    marginTop: 28,
  },
});
