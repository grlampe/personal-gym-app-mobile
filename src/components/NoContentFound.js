import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { size } from 'lodash';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function NoContentFound(props) {

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

    const {data} = props;

        if(size(data) < 1){

            return(
                <View style={{alignSelf:'center', marginTop:20}}>
                <Text style={{opacity:0.5, fontSize:16}}>{Strings.ST75}</Text>
                </View>
                );

        }else{
            return null;
        }

}