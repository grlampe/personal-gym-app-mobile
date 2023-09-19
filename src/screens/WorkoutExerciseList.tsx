import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView, I18nManager, StyleSheet } from 'react-native';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { map, size } from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, Text } from 'react-native-paper';
import ColorsApp from '../config/ColorsApp';
import RestDay from '../components/RestDay';
import { WorkoutExercise, useWorkoutExerciseRepository } from '../repositories/useWorkoutExerciseRepository';

interface WorkoutExerciseListProps {
  route: {
    params: {
      workoutCategoryId: string;
      description: string;
    };
  };
  navigation: any;
}

export default function WorkoutExerciseList(props: WorkoutExerciseListProps) {
  const { route } = props;
  const { navigation } = props;
  const { workoutCategoryId, description } = route.params;
  const { workoutExercise, setWorkoutExercise, searchWorkoutOnExerciseByWorkoutCategoryId } = useWorkoutExerciseRepository();
  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (workoutExercise: WorkoutExercise) => {
    navigation.navigate('exerciseDetails', { workoutExerciseParam: workoutExercise });
  };

  const onClickStart = (id: string) => {
    navigation.navigate('timer', { id });
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: description,
    });
  }, []);

  useEffect(() => {
    searchWorkoutOnExerciseByWorkoutCategoryId(workoutCategoryId).then((response) => {
      setWorkoutExercise(response.filter(workoutExercise => workoutExercise.exercise.active));
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <AppLoading />
    );
  } else {
    if (size(workoutExercise) >= 1) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >

            <SafeAreaView>
              {map(workoutExercise, (item, i) => (
                <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item)}>
                  <List.Item
                    key={i}
                    title={item.exercise.name}
                    titleStyle={styles.titleStyle}
                    titleNumberOfLines={2}
                    underlayColor="transparent"
                    rippleColor="transparent"
                    left={(_) => (
                      <View style={styles.leftContainer}>
                        <Text style={styles.numberText}>{i + 1 + 'º'}</Text>
                        <View style={styles.itemListView2}>
                          <Image source={require('../../assets/icon.png')} style={styles.itemListImage2} resizeMode={"center"} />
                        </View>
                      </View>
                    )}
                    right={(props) => <List.Icon {...props} icon={rightIcon} style={styles.rightIcon} />}
                  />
                </TouchableOpacity>
              ))}
            </SafeAreaView>
          </ScrollView>

          {/* <View>
            <FAB
              style={styles.fabStyle}
              label={Strings.ST122}
              icon="play"
              onPress={() => onClickStart(workoutCategoryId)}
            />
          </View> */}

        </View>
      );
    } else {
      return (
        <RestDay />
      )
    }
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 3,
  },
  leftContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    marginHorizontal: 15,
    color: ColorsApp.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemListView2: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  itemListImage2: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  rightIcon: {
    opacity: 0.5,
    alignSelf: 'center',
  },
  fabStyle: {
    marginHorizontal: 50,
    marginBottom: 20,
    elevation: 0,
  },
});
