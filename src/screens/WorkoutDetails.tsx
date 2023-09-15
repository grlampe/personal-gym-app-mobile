import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getWorkoutById } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import Days from '../components/Days';
import LevelRate from '../components/LevelRate';

type WorkoutDetailProps = {
  navigation: any,
  route: {
    params: {
      id: string;
    }
  }
};

export default function WorkoutDetails(props: WorkoutDetailProps) {

  const { route, navigation } = props;
  const { id } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState<any[]>([]);

  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  useEffect(() => {
    getWorkoutById(id).then((response) => {
      setItem(response[0]);
      setIsLoaded(true);
    });
  }, [item]);

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
            <ImageBackground source={{ uri: item?.image }} style={Styles.HeaderImage} resizeMode={'cover'}>
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.HeaderGradient}>
                <Text style={Styles.HeaderTitle}>{item?.title}</Text>
                <Text style={Styles.HeaderSubTitle}>{item?.duration}</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <LevelRate rate={item?.rate} iconsize={22}></LevelRate>
                </View>
              </LinearGradient>
            </ImageBackground>

            <Grid style={Styles.WorkoutGrid}>
              <Col style={Styles.WorkoutGridCol}>
                <Text style={Styles.WorkoutGridTitle}>{Strings.ST87}</Text>
                <Text style={Styles.WorkoutGridSubTitle}>{item?.level}</Text>
              </Col>
              <Col style={Styles.WorkoutGridCol}>
                <Text style={Styles.WorkoutGridTitle}>{Strings.ST89}</Text>
                <Text style={Styles.WorkoutGridSubTitle}>{item?.goal}</Text>
              </Col>
            </Grid>
            <Days Number={7} WorkoutId={item?.id}></Days>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
