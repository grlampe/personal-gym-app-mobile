import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function Empty(){

const contextState = React.useContext(LanguageContext);
const language = contextState.language;
const Strings = Languages[language].texts;

		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>{Strings.ST30}</Text>
			</View>
			);
}