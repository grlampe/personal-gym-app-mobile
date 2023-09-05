import React from 'react';
import { View } from 'react-native';
import { Title, Subheading, Button } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function EmptyResults(){

	const contextState = React.useContext(LanguageContext);
	const language = contextState.language;
	const Strings = Languages[language].texts;

	return(
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
		<Title style={{fontWeight: 'bold'}}>{Strings.ST65}</Title>
		<Subheading style={{textAlign: 'center', marginVertical: 10, marginHorizontal: 30}}>{Strings.ST66}</Subheading>
		<Button icon="refresh">{Strings.ST74}</Button>
		</View>
		);
}