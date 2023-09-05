import React, { useState, useEffect } from 'react';
import { View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {getPremiumWorkouts} from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { map } from "lodash";
import { Text } from 'react-native-paper';
import LanguageContext from '../languages/LanguageContext';
import LevelRate from '../components/LevelRate';
import Loading from './InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ColorsApp from '../config/ColorsApp';

export default function PremiumWorkouts() {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('workoutdetails', {id, title});
  };
  
  useEffect(() => {
    getPremiumWorkouts().then((response) => {
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

      <View style={{width: '100%', marginTop: 10}}>

        {map(items, (item, i) => (

        <TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <ImageBackground source={{uri: item.image}} style={Styles.card3_background} imageStyle={{borderRadius: 8}}>
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>

          <View style={Styles.card3_viewicon}>
          <Icon name="lock" color={ColorsApp.PRIMARY} size={15}></Icon>
          <Text style={Styles.card3_icon}>{Strings.ST26}</Text>
          </View>

          <View style={Styles.card3_rate}>
            {item.rate ? <LevelRate rate={item.rate}/> : null}
          </View>
          
            <Text numberOfLines={2} style={Styles.card3_title}>{item.title}</Text>
            <Text numberOfLines={2} style={Styles.card3_subtitle}>{item.duration}</Text>

          </LinearGradient>
        </ImageBackground>
        </TouchableOpacity>

          ))}

      </View>

      );

  }

}