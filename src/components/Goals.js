import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import Loading from './InnerLoading';
import {getGoals} from "../config/DataApp";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Goals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    getGoals().then((response) => {
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
      <View style={{marginVertical: 10, marginBottom: 20}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, index) => (
        <RenderItem key={index} item={item} />

          ))}
      </ScrollView>
      </View>
      );
  }

}

function RenderItem(props) {

    const navigation = useNavigation();

    const onChangeScreen = (id, title) => {
    navigation.navigate('singlegoal', {
      id: id,
      title: title
    });    
  };

    const { item } = props;
    const { id, title } = item;

      return (
    <View style={Styles.card6_view}>
    <TouchableOpacity onPress={() => onChangeScreen(id, title)} activeOpacity={1} activeScale={0.98}>

    <ImageBackground source={{uri: item.image}} style={Styles.card6_background} imageStyle={{borderRadius: 8}}>
          <View style={Styles.card6_gradient}>
            <Text style={Styles.card6_title} numberOfLines={2}>{item.title}</Text>
          </View>
    </ImageBackground>

    </TouchableOpacity>
      </View>

      )

}