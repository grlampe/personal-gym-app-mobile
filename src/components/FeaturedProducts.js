import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from './InnerLoading';
import { getFeaturedProducts } from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';
import { useNavigation } from '@react-navigation/native';

export default function FeaturedProducts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

  const onChangeScreen = (id) => {
    navigation.navigate('productdetails', {id});
  };

  useEffect(() => {
    getFeaturedProducts().then((response) => {
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
    
    <TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id)} activeScale={0.98}>
        <ImageBackground source={{uri: item.image}} style={Styles.card1_background} imageStyle={{borderRadius: 8}}>
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>

            <View style={Styles.card1_viewicon}>
                <Icon name="percent" style={[Styles.card1_icon, {fontSize:14}]}/>
            </View>

            <Text numberOfLines={2} style={Styles.card1_title}>{item.title}</Text>
            <Text numberOfLines={1} style={[Styles.card1_title, {color: ColorsApp.PRIMARY, marginVertical:5}]}>{item.price}</Text>

          </LinearGradient>
        </ImageBackground>
        </TouchableOpacity>

          ))}
      </ScrollView>
      </View>
      );
  }

}