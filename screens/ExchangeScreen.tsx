import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { FC, useContext, useState } from 'react';
import axios from 'axios';
import { Form } from '../components/Form';
import { Layout } from '../components/Layout';
import { FormContext } from '../ctx';
import {
  Toast,
  ToastDetails,
} from '../components/Toast';

export interface Response {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  historical: boolean;
  date: string;
  result: number;
}

export const ExchangeScreen: FC = () => {
  const { budget } = useContext(FormContext);
  const [toast, setToast] =
    useState<ToastDetails>({
      isShowed: false,
      msg: '',
      type: 'INFO',
    });

  const exchangeMoney = async (
    currency: string,
    amount: number
  ) => {
    await axios.get<Response>(
      `https://api.exchangerate.host/convert?from=${budget.currency}&to=${currency}&amount=${amount}`
    );
  };
  return (
    <Layout>
      <View
        style={{
          paddingTop: 28,
        }}
      >
        <Form
          onExchange={exchangeMoney}
          setToast={setToast}
        />
      </View>
      {toast.isShowed && (
        <Toast
          {...toast}
          hideToast={setToast}
        />
      )}
    </Layout>
  );
};
