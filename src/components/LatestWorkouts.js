import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from './InnerLoading';
import { getLatestWorkouts } from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Paragraph, Text} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LevelRate from './LevelRate';

export default function LatestWorkouts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

  const onChangeScreen = (id, title) => {
    navigation.navigate('workoutdetails', {id, title});
  };

  useEffect(() => {
    getLatestWorkouts().then((response) => {
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
    return (
      <View style={{marginTop: 10}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, i) => (
    
    <TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98}>
        <ImageBackground source={{uri: item.image}} style={Styles.card1_background} imageStyle={{borderRadius: 8}}>
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>

            {/*item.price === "premium" ? <View style={Styles.card1_viewicon}><Icon name="lock" style={Styles.card1_icon}/></View> : null */}
            
            {item.rate ? <View style={[Styles.card1_viewicon, {flexDirection:'row'}]}><LevelRate rate={item.rate}/></View> : null}

            <Paragraph style={Styles.card1_subtitle}>{item.level}</Paragraph>
            <Text numberOfLines={2} style={Styles.card1_title}>{item.title}</Text>

          </LinearGradient>
        </ImageBackground>
        </TouchableOpacity>

          ))}
      </ScrollView>
      </View>
      );
  }

}