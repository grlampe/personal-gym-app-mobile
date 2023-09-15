import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import Styles from '../config/Styles';
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import { WorkoutList } from '../repositories/useWorkoutRepositoty';
import WorkoutCategoryList from '../components/WorkoutCategoryList';

type WorkoutDetailProps = {
  route: {
    params: {
      workout: WorkoutList;
    }
  }
};

export default function WorkoutDetails(props: WorkoutDetailProps) {
  const { route } = props;
  const { workout } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!!workout);
  }, [workout]);

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
                <Text style={Styles.HeaderTitle}>{workout.description}</Text>
              </LinearGradient>
            </ImageBackground>
            <WorkoutCategoryList workoutId={workout.id} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
