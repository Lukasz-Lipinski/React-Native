import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { Btn } from '../Btn';
import {
  useContext,
  useMemo,
  useState,
} from 'react';
import { AppColors } from '../../styles';
import { Toggler } from '../Toggler';
import {
  isValidEmail,
  isValidPassword,
  FirebaseRequest,
  signup,
  signin,
  FirebaseResponse,
} from '../../services';
import { FormContext } from '../../ctx';
import {
  Toast,
  ToastDetails,
  ToastProps,
} from '../Toast';
import { useNavigation } from '@react-navigation/native';

export const SignInForm = () => {
  const navigation = useNavigation<{
    navigate: (path: string) => void;
  }>();
  const [isSignup, setIsSignup] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isTouchedEmail, setIsTouchedEmail] =
    useState<boolean>(false);
  const [password, setPassword] =
    useState<string>('');
  const [
    isTouchedPassword,
    setisTouchedPassword,
  ] = useState<boolean>(false);
  const [toast, setToast] =
    useState<ToastDetails>({
      isShowed: false,
      msg: '',
      type: 'INFO',
    });

  const { setUser, user } =
    useContext(FormContext);

  const onToggle = () => {
    setIsSignup(!isSignup);
  };

  const onSetEmail = (txt: string) => {
    !isTouchedEmail && setIsTouchedEmail(true);
    setEmail(txt);
  };

  const onSetPassword = (txt: string) => {
    !isTouchedPassword &&
      setisTouchedPassword(true);
    setPassword(txt);
  };

  const sendData = async () => {
    const userData: Omit<
      FirebaseRequest,
      'returnSecureToken'
    > = {
      email,
      password,
    };

    let res: any;

    if (isSignup && isDisabled) {
      res = await signup(userData);
    } else {
      res = await signin(userData);
    }

    res.status !== 200 &&
      setToast({
        isShowed: true,
        msg: res.data || 'Invalid data',
        type: 'ERROR',
      });

    res.status === 200 && console.log(res);
    setUser({
      email: res.data.email,
      isLogged: true,
      idToken: res.data.idToken,
      accountNo: 0,
      wallets: [],
    });
    res.status === 200 &&
      navigation.navigate('Account');
  };

  const setLabel = useMemo(
    () => (isSignup ? 'Sign up' : 'Sign in'),
    [isSignup]
  );

  const isDisabled = useMemo(() => {
    return (
      isValidEmail(email) &&
      isValidPassword(password)
    );
  }, [email, password]);

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
      >
        <View>
          <View>
            <View>
              <Text style={styles.paragraph}>
                Email:{' '}
              </Text>
              <TextInput
                style={
                  !isValidEmail(email) &&
                  isTouchedEmail
                    ? styles.inputError
                    : styles.input
                }
                onChangeText={onSetEmail}
              />
            </View>
            {!isValidEmail(email) &&
              isTouchedEmail && (
                <Text style={styles.error}>
                  Invalid email
                </Text>
              )}
          </View>
          <View>
            <Text style={styles.paragraph}>
              Password:{' '}
            </Text>
            <TextInput
              style={
                !isValidPassword(password) &&
                isTouchedPassword
                  ? styles.inputError
                  : styles.input
              }
              secureTextEntry={true}
              onChangeText={onSetPassword}
            />
            {!isValidPassword(password) &&
              isTouchedPassword && (
                <Text style={styles.error}>
                  Password should have 7 letters
                  at least
                </Text>
              )}
          </View>
          <View style={styles.disptacher}>
            <Button
              title={setLabel}
              onPress={sendData}
              color={AppColors.green}
              disabled={!isDisabled}
            />
          </View>
        </View>
        <View>
          <Toggler
            onToggle={onToggle}
            formType={isSignup}
          />
        </View>
      </ScrollView>
      {toast.isShowed && (
        <Toast
          {...toast}
          hideToast={setToast}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: AppColors.red,
    padding: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  paragraph: {
    fontSize: 24,
    paddingVertical: 12,
    textAlign: 'center',
    color: AppColors.dark,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: AppColors.white,
  },
  inputError: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: AppColors.red,
    padding: 10,
    backgroundColor: AppColors.white,
  },
  disptacher: {
    paddingTop: 32,
  },
});
