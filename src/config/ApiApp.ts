import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { getToken } from "../context/Authenticate";

const api = axios.create({
  baseURL: 'http://localhost:3001/'
});

api.interceptors.request.use(async config => {
  const token = getToken();
    if (!!token) {
      if(config.headers){
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      if (config.url !== '/login') {
        Alert.alert('Usuário Inválido.', 
          'Verifique o cadastro do usuário que está tentando efetuar esta ação!');
      }
    }

    return config;
});

api.interceptors.response.use(async function (response) {
  return response;
}, async function (error) {
  const token = await getToken();

  if (error?.response?.status === 401 && token) {
    await AsyncStorage.removeItem('storageCurrentUser');
    await AsyncStorage.removeItem('storageTokenName');
  }

  if (error?.response?.data?.message) {
    Alert.alert(error.response.data.message);
  } else {
    Alert.alert(error.message);
  }

  return Promise.reject(error);
});

export { api };