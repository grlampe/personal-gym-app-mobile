import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-render-html';
import Styles from '../config/Styles';
import AppLoading from '../components/InnerLoading';
import usePreferences from '../hooks/usePreferences';

export default function Terms() {

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
    <SafeAreaView>
    <View style={Styles.GuestPageScreen}>
    <HTMLView source={{html: item.st_privacypolicy ? item.st_privacypolicy : `<p></p>`}} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    <HTMLView source={{html: item.st_privacypolicy ? item.st_privacypolicy : `<p></p>`}} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark}/>
    </View>
    </SafeAreaView>
    </ScrollView>

      );

    }else{
   return (
     <AppLoading/>
     );
 }
 
}

