import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageCurrentUser, storageTokenName } from "../utils/consts";
import { useApi } from "../repositories/useRepository";

export const AuthContext = createContext({} as AuthContextData);

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

type AuthContextData = {
  currentUser: User | undefined;
  signIn: (user: UserSignInForm) => Promise<void>;
  signOut: () => void;
  isLogged: boolean;
}

type AuthProvider = {
  children: ReactNode,
}

export type LoginData = {
  access_token: string;
  user: User;
}

export const AuthProvider = (props: AuthProvider) => {
  const { api } = useApi();
  let { signOutApi } = useApi();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  async function signOut() {
    setCurrentUser(null);
    await AsyncStorage.removeItem(storageCurrentUser);
    await AsyncStorage.removeItem(storageTokenName);
    setIsLogged(false);
  }

  React.useEffect(() => {
    signOutApi = signOut;
  }, [signOutApi]);

  async function fetchIsLogged() {
    const storedUser: User = JSON.parse(await AsyncStorage.getItem(storageCurrentUser));
    const storedToken = await AsyncStorage.getItem(storageTokenName);
    setIsLogged(!!storedUser && !!storedToken)

    if (!currentUser && !!storedUser) {
      setCurrentUser(storedUser)
    }
  }

  React.useEffect(() => {
    fetchIsLogged();
  }, [currentUser]);
  
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

  return (
    <AuthContext.Provider value={{ isLogged, currentUser, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}