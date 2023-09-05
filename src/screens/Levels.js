import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import { getLevels } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadMoreButton from '../components/LoadMoreButton';

export default function Levels(props) {

  const { navigation } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    navigation.navigate('singlelevel', {id, title});
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getLevels(page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={5}
      Click={() => loadMore()}/>
      )
  }

  const buttonSearch = () => {
    return (
      <IconButton icon="magnify" size={24} iconColor="white" style={{marginLeft:15}} onPress={() => onChangeScreen('searchworkout')}/>
      )
  };

  useEffect(() => {
  
    props.navigation.setOptions({
      headerRight: () => buttonSearch()
    });
  
  }, []);

  useEffect(() => {
    getLevels().then((response) => {
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
        <ImageBackground source={{uri: item.image}} style={Styles.background_categories} imageStyle={{borderRadius: 8}}>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.gradient_categories}>
            <View style={Styles.title_categories_border}></View>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={Styles.title_categories_background}>
                    <Text style={Styles.title_categories}>{item.title}</Text>
            </LinearGradient>
            </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>

          ))}

    {renderButton()}

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


