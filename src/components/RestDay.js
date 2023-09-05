import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function RestDay(){

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="bed" style={{color: ColorsApp.PRIMARY, fontSize:56}}/>
                <Text style={{fontWeight:'bold', fontSize:22, marginVertical:8}}>{Strings.ST91}</Text>
                <Text style={{fontSize:18}}>{Strings.ST92}</Text>
			</View>
			);
}