import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ColorsApp from '../config/ColorsApp';

export default function AppLoading(){

return(
	<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
	<ActivityIndicator color={ColorsApp.PRIMARY} size={"large"} />
	</View>
	);
}