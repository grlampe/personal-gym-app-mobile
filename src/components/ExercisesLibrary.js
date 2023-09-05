import React from 'react';
import { View, I18nManager } from 'react-native';
import { Title, Text, Card } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import ColorsApp from '../config/ColorsApp';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ExercisesLibrary(){

    const navigation = useNavigation();
    const contextState = React.useContext(LanguageContext);
	const language = contextState.language;
	const Strings = Languages[language].texts;

    const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

    const onChangeScreen = (screen) => {
        navigation.navigate(screen);
    };

	return(
        <TouchableOpacity activeOpacity={1} activeScale={0.98} onPress={() => onChangeScreen('exercises')}>
		<View style={{flex: 1, marginHorizontal:18, borderRadius:8, marginBottom:15}}>
		<Card
        style={{justifyContent: 'center', alignItems: 'flex-start', width:'100%', height:180, borderRadius:8}}>
            <View style={{paddingHorizontal:18}}>
            <Title style={{fontWeight: 'bold'}}>{Strings.ST59}</Title>
		    <Text style={{marginBottom: 15, opacity:0.5}}>{Strings.ST60}</Text>
            <View style={{flexDirection:'row', alignItems:'center', alignContent:'center', justifyContent:'center', backgroundColor:ColorsApp.PRIMARY, paddingVertical:10, paddingHorizontal:12, borderRadius:8}}>
                <Text style={{marginRight:8, color:'black', fontWeight:'bold'}}>{Strings.ST61}</Text>
            </View>
            </View>
		</Card>
		</View>
		</TouchableOpacity>
		);
}