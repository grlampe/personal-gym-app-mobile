import React, { useEffect } from 'react';
import { View, I18nManager } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { map } from 'lodash';
import Styles from '../config/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Empty from './Empty';
import { WorkoutCategory, useWorkoutCategoryRepository } from '../repositories/useWorkoutCategoryRepository';

interface WorkoutCategoryListProps {
  workoutId: string;
}

export default function WorkoutCategoryList(props: WorkoutCategoryListProps) {
  const { workoutId } = props;
  const { workoutCategories, setWorkoutCategories, searchWorkoutOnCategoryByWorkoutId } = useWorkoutCategoryRepository();
  const rightIcon = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';
  const navigation = useNavigation<any>();

  useEffect(() => {
    searchWorkoutOnCategoryByWorkoutId(workoutId).then((response: WorkoutCategory[]) => {
      setWorkoutCategories(response.filter(workoutCategory => workoutCategory.active));
    })
  }, []);

  const onChangeScreen = (workoutCategoryId: string, description: string) => {
    navigation.navigate('workoutExerciseList', { workoutCategoryId, description });
  };

  if (workoutCategories.length === 0){
    return <Empty />
  } else {
    return (
      <View style={{ marginVertical: 10, marginBottom: 40 }}>
        {map(workoutCategories, (item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onPress={() => onChangeScreen(item.id, item.description)}
          >
            <View style={Styles.DayList}>
              <Text style={Styles.DayListText}>{item.description}</Text>
              <Icon name={rightIcon} style={Styles.DayListIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
