import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getWorkoutById, removeWorkoutBookmark, setWorkoutBookmark } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, IconButton } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import Days from '../components/Days';
import LevelRate from '../components/LevelRate';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkoutDetails(props) {

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState('');
  const [item, setItem] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const renderBookMark = async (id) => {
    await AsyncStorage.getItem('workoutsFav').then(token => {
      const res = JSON.parse(token);
 
      if (res !== null) {
       let data = res.find(value => value.id === id);
 
       if (data !== null) {
         let data = res.find(value => value.id === id);
         return data == null ? setBookmark(false) : setBookmark(true);
       }
 
     } else {
       return false;
     }
 
   });
  };

  useEffect(() => {
    renderBookMark(id);
  }, []);

  const saveBookmark = (id, title, image) => {

    let data = {id, title, image};
    setBookmark(true);
    setWorkoutBookmark(data).then(token => {
      if (token === true) {
        setBookmark(true);
      }
    });
    
  };
  
  const removeBookmark = (id) => {
    removeWorkoutBookmark(id).then(token => {
     if (token === true) {
       setBookmark(false);
     }
     
   });
   
   };

  const renderButtonFav = () => {

    if (!isBookmark) {
        return (
          <IconButton icon="heart-outline" iconColor="white" size={24} style={{marginRight: 15}} onPress={() => saveBookmark(item.id, item.title, item.image)}/>
          )
      }else{
        return (
          <IconButton icon="heart" iconColor="red" size={24} style={{marginRight: 15}} onPress={() => removeBookmark(item.id)}/>
          )
        }
      }

      useEffect(() => {

        props.navigation.setOptions({
          headerRight: () => renderButtonFav(),
        });

      }, [isBookmark, item]);

  useEffect(() => {
    getWorkoutById(id).then((response) => {
        setItem(response[0]);
        setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (
   
        <View style={{marginTop:50}}>
          <AppLoading/>
          </View>
   
         );
   
      }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View>

    <ImageBackground source={{uri: item.image}} style={Styles.HeaderImage} resizeMode={'cover'}>
    <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.HeaderGradient}>

    <Text style={Styles.HeaderTitle}>{item.title}</Text>
    <Text style={Styles.HeaderSubTitle}>{item.duration}</Text>

    <View style={{flexDirection:'row', marginTop:8}}>
    <LevelRate rate={item.rate} iconsize={22}></LevelRate>
    </View>

    </LinearGradient>
    </ImageBackground>

    <Grid style={Styles.WorkoutGrid}>

      <Col style={Styles.WorkoutGridCol}>
      <Text style={Styles.WorkoutGridTitle}>{Strings.ST87}</Text>
      <Text style={Styles.WorkoutGridSubTitle}>{item.level}</Text>
      </Col>

      <Col style={Styles.WorkoutGridCol}>
      <Text style={Styles.WorkoutGridTitle}>{Strings.ST89}</Text>
      <Text style={Styles.WorkoutGridSubTitle}>{item.goal}</Text>
      </Col>

    </Grid>

    <Days Number={7} WorkoutId={item.id}></Days>

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


