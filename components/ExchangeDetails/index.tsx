import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

interface ExchangeDetailsProps {}

export const ExchangeDetails = () => {
  const [amount, setAmount] = useState<string>();

  const onChangeFun = (value: string) => {
    try {
      parseInt(value);
      setAmount(value);
    } catch (e) {
      throw new Error('error');
    }
  };
  return (
    <ScrollView>
      <Text>Details</Text>
      <View>
        <Text>Amount:</Text>
        <TextInput onChangeText={onChangeFun} />
      </View>
    </ScrollView>
  );
};
