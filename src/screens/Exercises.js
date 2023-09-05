import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView, TouchableOpacity} from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getBodyparts } from "../config/DataApp";
import AppLoading from '../components/AppLoading';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Col, Row, Grid } from "react-native-easy-grid";
import _, { map } from 'lodash';

export default function Exercises(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  
  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    props.navigation.navigate('singlemuscle', {id, title});
  };

  useEffect(() => {
    getBodyparts().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

  const rows = _.chunk(items, 2);

  if (!isLoaded) {

    return (
   
        <AppLoading/>
   
         );
   
      }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}>

  <SafeAreaView>

  <View style={Styles.ContentScreen}>

    <Grid style={{marginBottom: 10, marginHorizontal: 5}}>
    <Col style={{margin: 5}}>
    <Button icon="dumbbell" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('equipments')}>
    {Strings.ST57}
    </Button>
    </Col>
    </Grid>

    {rows.map((row, index) => (
    <View key={index} style={Styles.gridView}>
    {row.map((item, index2) => (
    <View style={Styles.gridViewItem} key={index2}>
    <TouchableOpacity activeOpacity={0.9} onPress={() => onClickItem(item.id, item.title)}>
    <ImageBackground source={{uri: item.image}} style={Styles.card5_background} imageStyle={{borderRadius: 8}}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card5_gradient}>

    <Text numberOfLines={1} style={Styles.card5_title}>{item.title}</Text>
    <View style={Styles.card5_border}></View>

    </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>
    </View>
    ))}
    </View>
    ))}

  </View>
  </SafeAreaView>
  </ScrollView>

      );

}

}


