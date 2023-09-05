import React, { useState, useEffect } from 'react';
import { I18nManager, View} from 'react-native';
import {getLatestProducts} from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { map } from "lodash";
import { Avatar, List } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Loading from './InnerLoading';
import { useNavigation } from '@react-navigation/native';
import ColorsApp from '../config/ColorsApp';

export default function LatestProducts() {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const navigation = useNavigation();
  
  const onChangeScreen = (id) => {
    navigation.navigate('productdetails', {id});
  };
  
  useEffect(() => {
    getLatestProducts().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {

    return(

      <View style={{width: '100%', marginTop: 10, marginLeft:20}}>

        {map(items, (item, i) => (

<TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id)} activeScale={0.98}>
<List.Item
        key={i}
        title={item.title}
        titleStyle={{fontWeight: 'bold', fontSize:15, marginBottom: 3}}
        activeOpacity={1}
        titleNumberOfLines={2}
        description={item.price}
        descriptionStyle={{color: ColorsApp.PRIMARY, fontWeight:'bold', fontSize:15}}
        underlayColor="transparent"
        rippleColor="transparent"
        left={props => <Avatar.Image size={70} style={{marginRight: 10}} source={{uri: item.image}} />}
        right={props => <List.Icon {...props} icon={rightIcon}
        style={{alignSelf: 'center', opacity: 0.3, marginBottom:30}}/>}
      />
      </TouchableOpacity>

          ))}

      </View>

      );

  }

}