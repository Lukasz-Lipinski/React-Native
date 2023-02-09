import {
  Dispatch,
  FC,
  useContext,
  useState,
} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { FormContext } from '../ctx';
import { AppColors } from '../styles';
import { Btn } from '../components/Btn';
import { useNavigation } from '@react-navigation/native';
import { deleteAccount } from '../services';
import { UserWallet } from '../components/UserWallet';
import { UserData } from '../components/UserData';

interface AccountModalProps {
  isModal: boolean;
  setIsModal: Dispatch<boolean>;
  onDelete: () => void;
}

const AccountModal: FC<AccountModalProps> = ({
  isModal,
  setIsModal,
  onDelete,
}) => {
  return (
    <Modal
      visible={isModal}
      animationType='slide'
    >
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.modalText}>
            Do you really want to delete your
            account?
          </Text>
          <Text
            style={{
              fontSize: 18,
              paddingVertical: 10,
            }}
          >
            It's a prenament action and there no
            posibility to revert
          </Text>
        </View>
        <View style={styles.modalBtnContainer}>
          <Button
            title='Cancel'
            color={AppColors.blue}
            onPress={() => setIsModal(false)}
          />
          <Button
            title='Delete'
            color={AppColors.alert}
            onPress={onDelete}
          />
        </View>
      </View>
    </Modal>
  );
};

export const AccountScreen: FC = () => {
  const navigation = useNavigation<{
    navigate: (url: string) => void;
  }>();
  const { user, setUser } =
    useContext(FormContext);
  const [isModal, setIsModal] =
    useState<boolean>(false);
  const onShowModal = () => {
    setIsModal(true);
  };

  const onDelete = async () => {
    setUser({
      email: '',
      isLogged: false,
      idToken: '',
      accountNo: 0,
      wallets: [],
    });
    await deleteAccount(user.idToken);
    navigation.navigate('Home');
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <UserWallet />
        <UserData />
        <View style={styles.btnContainer}>
          <Btn
            label='Delete account'
            btnColor={AppColors.red}
            labelColor={AppColors.white}
            onPressFunction={onShowModal}
          />
        </View>
      </ScrollView>
      <AccountModal
        isModal={isModal}
        onDelete={onDelete}
        setIsModal={setIsModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  input: {
    borderRadius: 6,
    backgroundColor: AppColors.white,
    padding: 8,
  },
  btnContainer: {
    marginTop: 24,
  },
  modalContainer: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'justify',
    backgroundColor: AppColors.red,
  },
  modalBtnContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
