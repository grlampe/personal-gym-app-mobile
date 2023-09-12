import React, { useContext } from 'react';
import { I18nManager } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import ExerciseDetails from '../screens/ExerciseDetails';
import StackNavigation from './StackNavigation';
import Player from '../screens/Player';
import WorkoutDetails from '../screens/WorkoutDetails';
import SingleDay from '../screens/SingleDay';
import DietDetails from '../screens/DietDetails';
import ProductDetails from '../screens/ProductDetails';
import PostDetails from '../screens/PostDetails';
import Timer from '../screens/Timer';
import Completed from '../screens/Completed';

const RootStack = createStackNavigator();

export default function ModalNavigation(props: any) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme === "light" ? '#fff' : '#000'
    },
    headerTitleAlign: 'center',
    presentation: 'modal',
    gestureEnabled: false,
  };

  return (
    <RootStack.Navigator screenOptions={navigatorOptions}>
      <RootStack.Screen name="Main" component={StackNavigation} options={{ headerShown: false }} />
      <RootStack.Screen name="exercisedetails" component={ExerciseDetails} options={{ title: Strings.ST80, headerLeft: () => <IconButton icon="window-close" style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="workoutdetails" component={WorkoutDetails} options={{ headerTransparent: true, title: null, headerLeft: () => <IconButton icon="window-close" iconColor="#fff" style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="dietdetails" component={DietDetails} options={{ headerTransparent: true, title: null, headerLeft: () => <IconButton icon="window-close" iconColor="#fff" style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="productdetails" component={ProductDetails} options={{ headerTransparent: true, title: null, headerLeft: () => <IconButton icon="window-close" iconColor="#fff" style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="postdetails" component={PostDetails} options={{ headerTransparent: true, title: null, headerLeft: () => <IconButton icon="window-close" iconColor="#fff" style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="player" component={Player} options={{ headerTransparent: true, title: null }} />
      <RootStack.Screen name="timer" component={Timer} options={{ headerTransparent: true, title: null, headerLeft: null }} />
      <RootStack.Screen name="singleday" component={SingleDay} options={{ title: null, headerLeft: () => <IconButton icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"} style={{ marginLeft: 15 }} size={24} onPress={() => props.navigation.goBack()} /> }} />
      <RootStack.Screen name="completed" component={Completed} options={{ headerTransparent: true, title: null, headerLeft: null }} />
    </RootStack.Navigator>
  );
}
