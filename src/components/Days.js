import React from 'react';
import {View, I18nManager} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {map} from 'lodash';
import Styles from '../config/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { useNavigation } from '@react-navigation/native';

export default function Days(props) {

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

    const {Number, WorkoutId} = props;

    const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

    const totalDays = Array.from(Array(Number).keys());

    const navigation = useNavigation();

    const onChangeScreen = (id, day, title) => {
        navigation.navigate('singleday', {id, day, title});
      };

    return(

    <View style={{marginVertical:10, marginBottom:40}}>

    {map(totalDays, (i) => (

    <TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(WorkoutId, i+1, Strings.ST90+' '+(i+1))} activeScale={0.98}>
    <View style={Styles.DayList}>
    <Text style={Styles.DayListText}>{Strings.ST90+' '+(i+1)}</Text>
    <Icon name={rightIcon} style={Styles.DayListIcon}/>
    </View>
    </TouchableOpacity>

    ))}

    </View>

        );

}