import {
  Dispatch,
  FC,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from '../../styles';
import 'react-native-get-random-values';
import { v4 as tokenGen } from 'uuid';

interface WalletProps {
  currency: string;
  amount: number;
}

interface CodeModalProps {
  visible: boolean;
  currency: string;
  hideModal: Dispatch<boolean>;
}

const CodeModal: FC<CodeModalProps> = ({
  visible,
  hideModal,
  currency,
}) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(tokenGen());
  }, []);

  return (
    <Modal
      animationType='slide'
      visible={visible}
    >
      <View style={modalStyles.container}>
        <View>
          <Text style={modalStyles.p}>
            Use this generated code to pay in{' '}
            {currency}
          </Text>
          <View
            style={{
              paddingBottom: 42,
              paddingTop: 20,
            }}
          >
            <Text style={modalStyles.tokenText}>
              {token}
            </Text>
          </View>
        </View>
        <View>
          <Button
            title='Back'
            color={AppColors.red}
            onPress={() => hideModal(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
  },
  p: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 2,
    textAlign: 'center',
    color: AppColors.primary,
  },
  tokenText: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    padding: 18,
    fontWeight: 'bold',
    fontSize: 24,
    color: AppColors.primary,
  },
});

export const Wallet: FC<WalletProps> = ({
  amount,
  currency,
}) => {
  const [isModal, setIsModal] =
    useState<boolean>(false);
  const onShowModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={styles.p}>
              {amount}{' '}
            </Text>
            <Text style={styles.p}>
              {currency}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Icon
              name='coins'
              color={AppColors.blue}
              size={48}
            />
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            title='Generate code'
            onPress={onShowModal}
            color={AppColors.blue}
          />
        </View>
      </View>
      {isModal && (
        <CodeModal
          currency={currency}
          visible={isModal}
          hideModal={setIsModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: AppColors.blue,
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
  },
  p: {
    fontSize: 20,
    fontWeight: '600',
  },
});
