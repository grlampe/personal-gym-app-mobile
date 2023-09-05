import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import ColorsApp from '../config/ColorsApp';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function LoadingWorkout(){

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

		return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator animating={true} color={ColorsApp.PRIMARY} size={"large"} />
                <Text style={{fontSize:18, marginTop:20}}>{Strings.ST121}</Text>
			    </View>
			);
}