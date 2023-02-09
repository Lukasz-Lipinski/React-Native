import axios from 'axios';
import {
  REACT_APP_API_KEY,
  REACT_APP_DELETE_API,
  REACT_APP_SINGIN_API,
  REACT_APP_SINGUP_API,
} from '../config';

export interface FirebaseRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FirebaseResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export const isValidPassword = (
  value: string
): boolean => {
  if (value.trim().length > 7) return true;

  return false;
};

export const isValidEmail = (
  value: string
): boolean => {
  if (
    value.trim().length &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  )
    return true;

  return false;
};

export const signup = async (
  user: Omit<FirebaseRequest, 'returnSecureToken'>
) => {
  const url = `${REACT_APP_SINGUP_API}${REACT_APP_API_KEY}`;
  const body: FirebaseRequest = {
    ...user,
    returnSecureToken: true,
  };
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  console.log(res.status);

  const data = await res.json();

  return {
    status: res.status,
    data:
      res.status === 200
        ? data
        : 'This email exsists',
  };
};

export const signin = async (
  user: Omit<FirebaseRequest, 'returnSecureToken'>
) => {
  const res = await fetch(
    `${REACT_APP_SINGIN_API}${REACT_APP_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify(user),
    }
  );

  const data = await res.json();

  if ('error' in data) {
    return {
      status: data.error.code,
      data,
    };
  }

  return {
    status: 200,
    data,
  };
};

export const deleteAccount = async (
  idToken: string
) => {
  const res = await axios.post(
    `${REACT_APP_DELETE_API}${REACT_APP_API_KEY}`,
    {
      idToken,
    }
  );
};

export function checkIsNumber(value: string) {
  try {
    return parseFloat(value);
  } catch (e) {
    console.log(e);
  }
}
