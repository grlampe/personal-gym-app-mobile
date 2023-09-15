import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Empty from '../components/Empty';
import { WorkoutList, useWorkoutRepository } from '../repositories/useWorkoutRepositoty';
import { ApiContext } from '../context/api.context';

interface WorkoutsProps {
  navigation: any;
}

const Workouts: React.FC<WorkoutsProps> = (props) => {
  const { workouts, setWorkouts, searchWorkoutByUserId } = useWorkoutRepository();
  const { currentUser } = React.useContext(ApiContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onClickItem = (workout: WorkoutList) => {
    props.navigation.navigate('workoutDetails', { workout });
  };

  useEffect(() => {
    searchWorkoutByUserId(currentUser.id).then((response: WorkoutList[]) => {
      setWorkouts(response);
      setIsLoaded(true);
    })
  }, [workouts]);

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    if (workouts.length === 0){
      return <Empty />
    } else {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View style={Styles.ContentScreen}>
              {map(workouts, (item: WorkoutList, i: number) => (
                <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item)}>
                  <ImageBackground source={require('../../assets/workout-card.png')} style={Styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>
                      <Text numberOfLines={2} style={Styles.card3_title}>
                        {item.description}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    } 
  }
};

export default Workouts;
