import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, Image, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getEquipments } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import {map} from 'lodash';

export default function Equipments(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";
  
  const onClickItem = (id, title) => {
    props.navigation.navigate('singleequipment', {id, title});
  };

  useEffect(() => {
    getEquipments().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (
   
        <AppLoading/>
   
         );
   
      }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View style={Styles.ContentScreen}>

        {map(items, (item, i) => (

        <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item.id, item.title)} activeScale={0.98}>
            <List.Item
            key={i}
            title={item.title}
            titleStyle={{fontWeight: 'bold', fontSize:15, marginBottom: 3}}
            activeOpacity={1}
            titleNumberOfLines={2}
            underlayColor="transparent"
            rippleColor="transparent"
            left={props => <View style={Styles.itemListView}><Image source={{uri: item.image}} style={Styles.itemListImage} resizeMode={"center"} /></View>}
            right={props => <List.Icon {...props} icon={rightIcon} style={{alignSelf: 'center', opacity: 0.3, marginBottom:30}} />}
            />
        </TouchableOpacity>

        ))}


    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


