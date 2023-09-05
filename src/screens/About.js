import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, Image, useWindowDimensions } from 'react-native';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-render-html';
import AppLoading from '../components/InnerLoading';
import Styles from '../config/Styles';
import usePreferences from '../hooks/usePreferences';

export default function About() {

  const { width } = useWindowDimensions();
  const {theme} = usePreferences();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState('');

  useEffect(() => {

    getStrings().then((response) => {
      setItem(response[0]);
      setIsLoaded(true);
    });

  }, []);

  if (isLoaded) {

 return (

	<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View style={Styles.PageScreen}>
    <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.PageLogo} />
    <HTMLView source={{html: item.st_aboutus ? item.st_aboutus : `<p></p>`}} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    </View>
    </ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

