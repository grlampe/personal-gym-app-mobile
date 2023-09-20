import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageCurrentUser, storageTokenName } from "../utils/consts";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const ApiContext = createContext({} as ApiContext);

interface ApiContext {
  api: AxiosInstance;
  currentUser: User | undefined;
  signIn: (user: UserSignInForm) => Promise<void>;
  signOut: () => void;
  isLogged: boolean;
}

export type User = {
  id : string; 
  email : string; 
  name : string;
  active: boolean;  
  photoURL?: string;
}

type UserSignInForm = {
  username?: string;
  password?: string;
}

export type LoginData = {
  access_token: string;
  user: User;
}

type ApiProvider = {
  children: ReactNode;
};

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiProvider = (props: ApiProvider) => { 
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetchIsLogged();
  }, [currentUser]);
  
  ////// API

  api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem(storageTokenName);
    if (!!token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(async (response) => response,
    async (error) => {
      const token = await AsyncStorage.getItem(storageTokenName);

      if (error?.response?.status === 401 && token) {
        Alert.alert('Usuário Expirado!');
        return await signOut();
      } else if (error?.response?.data?.message) {
        Alert.alert(error.response.data.message);
      } else {
        Alert.alert(error.message);
      }

      return Promise.reject(error);
    }
  );

  ////// LOGIN

  async function fetchIsLogged() {
    const storedUser: User = JSON.parse(await AsyncStorage.getItem(storageCurrentUser));
    const storedToken = await AsyncStorage.getItem(storageTokenName);
    setIsLogged(!!storedUser && !!storedToken)

    if (!currentUser && !!storedUser) {
      setCurrentUser(storedUser)
    }
  }
  
  async function setUserData(data: LoginData) {
    if (data) {
      await AsyncStorage.setItem(storageTokenName, data.access_token);
      await AsyncStorage.setItem(storageCurrentUser, JSON.stringify(data.user));
      setCurrentUser(data.user);
      setIsLogged(true);
    }
  }
  
  async function signIn(user: UserSignInForm): Promise<void> {
    await api.post('/login', user).then(async (res) => {
      await setUserData(res.data)
    })
  }

   async function signOut() {
    setCurrentUser(null);
    await AsyncStorage.removeItem(storageCurrentUser);
    await AsyncStorage.removeItem(storageTokenName);
    setIsLogged(false);
  }

  const values = {
    api,
    isLogged,
    currentUser,
    signIn,
    signOut
  };

  return (
    <ApiContext.Provider value={values}>
      {props.children}
    </ApiContext.Provider>
  )
}
