import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import AppLoading from '../components/InnerLoading';
import { Text, List } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WorkoutExercise } from '../repositories/useWorkoutExerciseRepository';

interface ExerciseDetailsProps {
  route: {
    params: {
      workoutExercise: WorkoutExercise;
    };
  };
  navigation: any;
}

export default function ExerciseDetails(props: ExerciseDetailsProps) {
  const { width } = useWindowDimensions();
  const { route } = props;
  const { workoutExercise } = route.params;
  const { theme } = usePreferences();

  const [showInfo, setShowInfo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const pressShowInfo = () => setShowInfo(!showInfo);

  useEffect(() => {
    if (!!workoutExercise) {
      setIsLoaded(true);
    }  
  }, []);

  if (!isLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={Styles.ModalScreen}>
            <ImageBackground source={require('../../assets/bg.jpg')} style={Styles.ExerciseImage} resizeMode={'cover'} imageStyle={{ borderRadius: 8 }}>
              <View style={Styles.ExerciseImageView}>
                
              </View>
            </ImageBackground>

            <Text style={Styles.ExerciseTitle}>{workoutExercise?.exercise?.name}</Text>

            <Grid style={{ marginTop: 20 }}>
              <Col style={Styles.ExerciseCol}>
                <Icon name="backup-restore" style={Styles.ExerciseColIcon} />
                <Text style={Styles.ExerciseColTitle}>{Strings.ST83}</Text>
                <Text style={Styles.ExerciseColSubTitle}>{workoutExercise?.repetitions}</Text>
              </Col>

              <Col style={Styles.ExerciseCol}>
                <Icon name="checkbox-marked-circle-outline" style={Styles.ExerciseColIcon} />
                <Text style={Styles.ExerciseColTitle}>{Strings.ST82}</Text>
                <Text style={Styles.ExerciseColSubTitle}>{workoutExercise?.series}</Text>
              </Col>

              <Col style={Styles.ExerciseCol}>
                <Icon name="timer-outline" style={Styles.ExerciseColIcon} />
                <Text style={Styles.ExerciseColTitle}>{Strings.ST81}</Text>
                <Text style={Styles.ExerciseColSubTitle}>{workoutExercise?.restTime}</Text>
              </Col>

              <Col style={Styles.ExerciseCol}>
                <Icon name="dumbbell" style={Styles.ExerciseColIcon} />
                <Text style={Styles.ExerciseColTitle}>Peso</Text>
                <Text style={Styles.ExerciseColSubTitle}>{workoutExercise?.weight}</Text>
              </Col>
            </Grid>

            <View style={{ marginBottom: 10 }}>
              <List.Accordion
                title={Strings.ST84}
                titleStyle={Styles.ExerciseAccordionTitle}
                expanded={showInfo}
                style={Styles.ExerciseAccordion}
                onPress={pressShowInfo}>
              </List.Accordion>
              {showInfo ?
                <View style={Styles.ExerciseAccordionView}>
                  <Text>
                    {workoutExercise?.observation}
                  </Text>
                </View>
                : null
              }
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
