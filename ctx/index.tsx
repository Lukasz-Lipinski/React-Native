import {
  createContext,
  useState,
  ReactNode,
} from 'react';

interface Wallet {
  amount: number;
  currency: string;
}

interface User {
  email: string;
  idToken: string;
  isLogged: boolean;
  accountNo: number;
  wallets: Wallet[];
}

interface FormContextProps {
  budget: Wallet;
  setBudget: React.Dispatch<Wallet>;
  user: User;
  setUser: React.Dispatch<User>;
  setWallet: (data: Wallet) => void;
}

export const FormContext =
  createContext<FormContextProps>({
    budget: {
      amount: 0,
      currency: '',
    },
    setBudget: () => null,
    user: {
      email: '',
      isLogged: false,
      idToken: '',
      accountNo: 0,
      wallets: [],
    },
    setUser: () => null,
    setWallet: (data: Wallet) => null,
  });

interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = ({
  children,
}: FormContextProviderProps) => {
  const [budget, setBudget] = useState<{
    amount: number;
    currency: string;
  }>({ amount: 0, currency: '' });
  const [user, setUser] = useState<User>({
    email: '',
    isLogged: false,
    idToken: '',
    accountNo: 0,
    wallets: [],
  });

  const setWallet = ({
    amount,
    currency,
  }: Wallet) => {
    const isWallet = user.wallets.filter(
      (wallet) => wallet.currency === currency
    );

    !isWallet.length &&
      currency !== budget.currency &&
      setUser({
        ...user,
        wallets: [
          ...user.wallets,
          { amount, currency },
        ],
      });

    isWallet &&
      setUser((prevUserData) => ({
        ...prevUserData,
        wallets: prevUserData.wallets.map(
          (wallet) => {
            if (wallet.currency === currency) {
              return {
                ...wallet,
                amount: wallet.amount + amount,
              };
            } else {
              return wallet;
            }
          }
        ),
      }));
    currency !== budget.currency &&
      setBudget((currBudget) => ({
        ...currBudget,
        amount: currBudget.amount - amount,
      }));
  };

  return (
    <FormContext.Provider
      value={{
        budget,
        setBudget,
        user,
        setUser,
        setWallet,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
