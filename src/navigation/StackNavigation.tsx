import React, { useContext } from 'react';
import { I18nManager } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Workouts from '../screens/Workouts';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import ColorsApp from '../config/ColorsApp';
import BodyMeasurement from '../screens/BodyMeasurement';

const Stack = createStackNavigator();

export default function StackNavigation(props: any) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: ColorsApp.PRIMARY,
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
  };

  // ******************************** Buttons

  const buttonBack = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
        iconColor="white"
        style={{ marginLeft: 15 }}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const buttonMenu = () => {
    return (
      <IconButton
        icon="menu"
        size={24}
        style={{ marginLeft: 15 }}
        iconColor="white"
        onPress={() => props.navigation.openDrawer()}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: Strings.ST1, headerLeft: () => buttonMenu() }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ title: Strings.ST6, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ title: Strings.ST108, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="about"
        component={About}
        options={{ title: Strings.ST110, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{ title: Strings.ST8, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="workouts"
        component={Workouts}
        options={{ title: Strings.ST5, headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="bodyMeasurement"
        component={BodyMeasurement}
        options={{ title: Strings.ST21, headerLeft: () => buttonBack() }}
      />
    </Stack.Navigator>
  );
}