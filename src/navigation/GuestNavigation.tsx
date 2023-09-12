import React, { useContext } from 'react';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';

const RootStack = createStackNavigator();

export default function GuestNavigation(props: any) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    presentation: 'modal',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerTintColor: theme === 'dark' ? 'white' : 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    gestureEnabled: true,
  };

  return (
    <RootStack.Navigator
      screenOptions={navigatorOptions}
    >
      <RootStack.Screen
        name="login"
        component={Login}
        options={{ title: null, headerTransparent: true }}
      />
      <RootStack.Screen
        name="about"
        component={About}
        options={{ title: Strings.ST110 }}
      />
      <RootStack.Screen
        name="terms"
        component={Terms}
        options={{ title: Strings.ST8 }}
      />
    </RootStack.Navigator>
  );
}
