import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from './InnerLoading';
import { getFeaturedPosts } from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Paragraph, Text} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../config/ColorsApp';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';

export default function FeaturedPosts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('postdetails', {id, title});
  };

  useEffect(() => {
    getFeaturedPosts().then((response) => {
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
      <View style={{marginTop: 20}}>
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

            <View style={[Styles.card3_viewicon, {paddingLeft:5, paddingVertical:6}]}>
            <Text style={[Styles.card3_icon, {paddingLeft:0}]}>{item.tag}</Text>
            </View>

            <Paragraph style={Styles.card1_subtitle}>{item.level}</Paragraph>
            <Text numberOfLines={2} style={Styles.card1_title}>{item.title}</Text>
            <Text numberOfLines={1} style={[Styles.card1_title, {color: ColorsApp.PRIMARY, marginVertical:5}]}>{moment(item.date).fromNow()}</Text>

          </LinearGradient>
        </ImageBackground>
        </TouchableOpacity>

          ))}
      </ScrollView>
      </View>
      );
  }

}