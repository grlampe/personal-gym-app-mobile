import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
import './src/config/ConfigFirebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LogBox, StatusBar } from 'react-native';
import Loading from './src/components/AppLoading';
import LanguageContext from './src/languages/LanguageContext';
import Preferences from './src/context/Preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Provider as PaperProvider,
  MD2LightTheme as DefaultThemePaper,
  MD2DarkTheme as DarkThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as DefaultThemeNav,
  DarkTheme as DarkThemeNav,
} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import GuestNavigation from './src/navigation/GuestNavigation';
import ColorsApp from './src/config/ColorsApp';
import ConfigApp from './src/config/ConfigApp';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/ar';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/fr';
import OneSignal from 'react-native-onesignal';

OneSignal.setAppId(ConfigApp.ONESIGNAL_APP_ID);

DarkThemePaper.colors.primary = ColorsApp.PRIMARY;
DarkThemePaper.colors.accent = ColorsApp.PRIMARY;
DarkThemePaper.roundness = 6;

DefaultThemePaper.colors.primary = ColorsApp.PRIMARY;
DefaultThemePaper.colors.accent = ColorsApp.PRIMARY;
DefaultThemePaper.roundness = 6;
DefaultThemeNav.colors.background = '#fff';

LogBox.ignoreAllLogs();

const App = () => {
  const auth = getAuth();

  const [theme, setTheme] = useState(ConfigApp.THEMEMODE);
  const [isLogged, setIsLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState(ConfigApp.DEFAULTLANG);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    AsyncStorage.setItem('themeSetting', theme);
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  const updateValue = (lang) => {
    setLanguage(lang);
    AsyncStorage.setItem('language', lang);
  };

  useEffect(() => {
    async function checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          setIsLogged(true);
          setLoaded(true);
        } else {
          setIsLogged(false);
          setLoaded(true);
        }
      });
    }

    checkUser();
  }, []);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem('themeSetting').then((value) => {
        if (value) {
          setTheme(value === 'dark' ? 'light' : 'dark');
        }
      });
    }

    checkTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('language').then((lang) => {
      if (lang) {
        setLanguage(lang);
      }
    });
  }, []);

  useEffect(() => {
    if (
      language === 'es' ||
      language === 'ar' ||
      language === 'fr' ||
      language === 'ru' ||
      language === 'de'
    ) {
      moment.locale(language);
    } else {
      moment.locale('en');
    }
  }, [language]);

  if (!loaded) {
    return <Loading />;
  }

  if (loaded) {
    return (
      <Preferences.Provider value={preference}>
        <LanguageContext.Provider value={{ language, updateValue }}>
          <PaperProvider
            theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}
            settings={{ icon: (props) => <MaterialIcons {...props} /> }}
          >
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <NavigationContainer
              theme={theme === 'dark' ? DarkThemeNav : DefaultThemeNav}
            >
              {isLogged ? <DrawerNavigation /> : <GuestNavigation />}
            </NavigationContainer>
          </PaperProvider>
        </LanguageContext.Provider>
      </Preferences.Provider>
    );
  }
};

export default App;
