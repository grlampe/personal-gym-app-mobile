import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import Styles from '../config/Styles';
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import LanguageContext from '../languages/LanguageContext';
import Languages from '../languages';
import { ApiContext } from '../context/api.context';
import BodyMeasurementList from '../components/BodyMeasurementList';

export default function BodyMeasurement() {
  const { currentUser } = useContext(ApiContext);
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <View style={{ marginTop: 50 }}>
        <AppLoading />
      </View>
    );
  } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View>
            <ImageBackground source={require('../../assets/workout-card.png')} style={Styles.HeaderImage} resizeMode={'cover'}>
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.HeaderGradient}>
                <Text style={Styles.HeaderTitle}>{Strings.ST21}</Text>
              </LinearGradient>
            </ImageBackground>
            <BodyMeasurementList userId={currentUser?.id} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
