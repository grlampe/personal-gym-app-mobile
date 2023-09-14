import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { storageTokenName } from "../utils/consts";
import { ReactNode, createContext } from "react";

interface ApiContext {
  api: AxiosInstance;
  signOutApi: any;
}

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  },
});

const defaultProvider: ApiContext = {
  api,
  signOutApi: () => null,
};

const ApiContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const ApiProvider = ({ children }: Props) => {
  let signOutApi = () => {}
  
  api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem(storageTokenName);
    if (!!token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(async function (response) {
    return response;
  }, async function (error) {
    const token = await AsyncStorage.getItem(storageTokenName);

    if (error?.response?.status === 401 && token) {
      Alert.alert('Usuário Expirado!');
      signOutApi();
    } else if (error?.response?.data?.message) {
      Alert.alert(error.response.data.message);
    } else {
      Alert.alert(error.message);
    }

    return Promise.reject(error);
  });

  const values = {
    api,
    signOutApi
  };
  
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>
}

export { ApiContext, ApiProvider };