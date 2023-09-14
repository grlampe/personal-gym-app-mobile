import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutList, searchWorkoutByUserId } from '../services/workout.service';
import { AuthContext } from '../context/auth.context';
import Empty from '../components/Empty';

interface WorkoutsProps {
  navigation: any;
}

const Workouts: React.FC<WorkoutsProps> = (props) => {
  const { currentUser } = React.useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<WorkoutList[]>([]);

  const onClickItem = (id: string, description: string) => {
    props.navigation.navigate('workoutdetails', { id, description });
  };

  useEffect(() => {
    searchWorkoutByUserId(currentUser.id).then((response: WorkoutList[]) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, [items]);

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    if (items.length === 0){
      return <Empty />
    } else {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View style={Styles.ContentScreen}>
              {map(items, (item: WorkoutList, i: number) => (
                <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item.id, item.description)}>
                  <ImageBackground source={{ uri: item?.image }} style={Styles.card3_background} imageStyle={{ borderRadius: 8 }}>
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
