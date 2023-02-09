import { View, Text } from 'react-native';
import { Response } from '../../screens/ExchangeScreen';

interface ExchangeResultProps {
  result: Response;
}

export const ExchangeResult = ({
  result,
}: ExchangeResultProps) => {
  return (
    <View>
      <Text>{result.result}</Text>
    </View>
  );
};
