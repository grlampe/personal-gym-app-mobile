import React from 'react';
import { I18nManager } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
import ColorsApp from '../config/ColorsApp';
import Completed from '../screens/Completed';

const RootStack = createStackNavigator();

export default function ModalNavigation(props){

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const {theme} = usePreferences();

  const buttonClose = () => {
	return (
		<IconButton icon={"window-close"} style={{marginLeft:15}} size={24} onPress={() => props.navigation.goBack()}/>
		)
};

const buttonCloseLight = () => {
	return (
		<IconButton icon={"window-close"} iconColor={"#fff"} style={{marginLeft:15}} size={24} onPress={() => props.navigation.goBack()}/>
		)
};

const buttonCloseColor = () => {
	return (
		<IconButton icon={"window-close"} iconColor={ColorsApp.PRIMARY} style={{marginLeft:15}} size={24} onPress={() => props.navigation.goBack()}/>
		)
};

const buttonBack = () => {
	return (
		<IconButton icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"} style={{marginLeft:15}} size={24} onPress={() => props.navigation.goBack()}/>
		)
};

const buttonBackToHome = () => {
	return (
		<IconButton icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"} style={{marginLeft:15}} size={24} onPress={() => props.navigation.navigate('home')}/>
		)
};

	const navigatorOptions = {
		headerStyle: {
			shadowColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0,
			backgroundColor: theme === "light" ? '#fff' : '#000'
		},
		headerTitleAlign: 'center',
		presentation: 'modal',
		gestureEnabled: false,
		/*cardOverlayEnabled: true,
		...TransitionPresets.ModalPresentationIOS*/
	}

return (
    <RootStack.Navigator screenOptions={(route) => {return navigatorOptions}}>
      <RootStack.Screen name="Main" component={StackNavigation} options={{ headerShown: false }}/>
      <RootStack.Screen name="exercisedetails" component={ExerciseDetails} options={{title:Strings.ST80, headerLeft: () => buttonClose()}} />
      <RootStack.Screen name="workoutdetails" component={WorkoutDetails} options={{headerTransparent: true, title: null, headerLeft: () => buttonCloseLight()}} />
      <RootStack.Screen name="dietdetails" component={DietDetails} options={{headerTransparent: true, title: null, headerLeft: () => buttonCloseLight()}} />
      <RootStack.Screen name="productdetails" component={ProductDetails} options={{headerTransparent: true, title: null, headerLeft: () => buttonCloseLight()}} />
      <RootStack.Screen name="postdetails" component={PostDetails} options={{headerTransparent: true, title: null, headerLeft: () => buttonCloseLight()}} />
      <RootStack.Screen name="player" component={Player} options={{headerTransparent: true, title: null}} />
      <RootStack.Screen name="timer" component={Timer} options={{headerTransparent: true, title: null, headerLeft: null}} />
      <RootStack.Screen name="singleday" component={SingleDay} options={{title: null, headerLeft: () => buttonClose()}} />
      <RootStack.Screen name="completed" component={Completed} options={{headerTransparent: true, title: null, headerLeft: null}} />
    </RootStack.Navigator>
	)
}