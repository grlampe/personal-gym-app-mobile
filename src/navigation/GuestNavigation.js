import React from 'react';
import { I18nManager } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPass from '../screens/ForgotPass';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import { useNavigation } from '@react-navigation/native';

const RootStack = createStackNavigator();

export default function GuestNavigation(props){

const navigation = useNavigation();

const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const {theme} = usePreferences();

  const buttonBack = () => {
	return (
		<IconButton icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"} iconColor="white" style={{marginLeft:15}} size={24} onPress={() => navigation.goBack()}/>
	)
};

  const navigatorOptions = {
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
		headerTintColor: theme === "dark" ? 'white' : 'black',
		headerBackTitleVisible: false,
		headerTitleAlign: 'center',
		gestureEnabled: true,
		/*cardOverlayEnabled: true,
		...TransitionPresets.ModalPresentationIOS*/
	}

return (
    <RootStack.Navigator screenOptions={(route) => {return navigatorOptions}}>
      <RootStack.Screen name="login" component={Login} options={{title: null, headerTransparent: true}} />
      <RootStack.Screen name="register" component={Register} options={{title: Strings.ST11, headerTransparent: true, headerLeft: ()=> buttonBack()}} />
      <RootStack.Screen name="forgot" component={ForgotPass} options={{title: Strings.ST43, headerTransparent: true, headerLeft: ()=> buttonBack()}} />
      <RootStack.Screen name="about" component={About} options={{title: Strings.ST110}} />
      <RootStack.Screen name="terms" component={Terms} options={{title: Strings.ST8}} />
    </RootStack.Navigator>
	)
}