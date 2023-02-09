import {
  TextInput,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Btn } from '../Btn';
import {
  FC,
  useContext,
  useMemo,
  useState,
  Dispatch,
} from 'react';
import { FormContext } from '../../ctx';
import { AppColors } from '../../styles';
import { ToastDetails } from '../Toast';

interface UserDataProps {
  setToast: Dispatch<ToastDetails>;
}

export const UserData: FC<UserDataProps> = ({
  setToast,
}) => {
  const { user, setUser } =
    useContext(FormContext);
  const [accountNo, setAccountNo] = useState<{
    no: number;
    isValid: boolean;
  }>({
    no: 0,
    isValid: false,
  });

  const setPlacerholder = useMemo(() => {
    return user.accountNo
      ? `${user.accountNo}`
      : 'Write down your account number';
  }, [user.accountNo]);

  const checkAccountNo = (account: string) => {
    parseInt(account) &&
    account.trim() &&
    account.trim().length > 8
      ? setAccountNo({
          no: +account,
          isValid: true,
        })
      : setAccountNo({ no: 0, isValid: false });
  };

  const onSetAccountNo = () => {
    setUser({
      ...user,
      accountNo: accountNo.no,
    });
    setToast({
      msg: 'Account added successfully',
      isShowed: true,
      type: 'INFO',
    });
  };

  return (
    <View>
      <View>
        <Text style={styles.text}>
          Email: {user.email}
        </Text>
      </View>
      <View style={{ marginVertical: 24 }}>
        <TextInput
          style={styles.text}
          placeholder={setPlacerholder}
          onChangeText={checkAccountNo}
        />
        <Btn
          fontSize={22}
          label='Assign'
          onPressFunction={onSetAccountNo}
          disabled={!accountNo.isValid}
          isErrorBtn={false}
          labelColor={
            accountNo.isValid
              ? AppColors.blue
              : AppColors.red
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
  },
});
