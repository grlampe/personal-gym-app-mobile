import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Styles from '../config/Styles';
import { Text, ActivityIndicator } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { size } from "lodash";
import ColorsApp from '../config/ColorsApp';

export default function LoadMoreButton(props){
	
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

	const {Indicator, showButton, Items, Click, Num } = props;

    if (size(Items) >= Num) {

  if (showButton) {
    return (
      <View style={{height: 100}}>
        <TouchableOpacity activeOpacity={0.9} style={Styles.LoadMore} onPress={Click}>
        <Text style={{color: ColorsApp.PRIMARY}}>{!Indicator ? (Strings.ST111) : (<ActivityIndicator animating={Indicator} size={20} color={ColorsApp.PRIMARY} />)}</Text>
        </TouchableOpacity>
      </View>
    )
}else{
  return (
    <View style={Styles.NoMoreItems}>
      <Text style={{opacity: 0.3}}>{Strings.ST112}</Text>
    </View>
  )

}
}else{
  return null
}

}

