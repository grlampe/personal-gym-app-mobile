import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import AppLoading from '../components/InnerLoading';
import { Text } from 'react-native-paper';
import { BodyMeasurement } from '../repositories/useBodyMeasurementRepository';
import { Col, Grid } from 'react-native-easy-grid';
import { DateUtils } from '../utils/date';

interface BodyMeasurementDetailsProps {
  route: {
    params: {
      bodyMeasurementParam: BodyMeasurement;
    };
  };
  navigation: any;
}

export default function BodyMeasurementDetails(props: BodyMeasurementDetailsProps) {
  const { route } = props;
  const { bodyMeasurementParam } = route.params;
  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  useEffect(() => {
    setIsLoaded(!!bodyMeasurementParam);
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
                <Text style={Styles.card3_title}>{bodyMeasurementParam?.description} - {DateUtils.formatDateWithoutTime(bodyMeasurementParam?.createdAt)}</Text>
              </View>
            </ImageBackground>
            
            <Text style={Styles.ExerciseTitle}> </Text>

            <Grid>
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Altura</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.height} cm</Text>
              </Col>

              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Peso</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.weight} Kg(s)</Text>
              </Col>
            </Grid>

            <Text style={Styles.ExerciseTitle}> </Text>

            <Grid>
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Busto</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.chestBust} cm</Text>
              </Col>
            </Grid>

            <Text style={Styles.ExerciseTitle}> </Text>

            <Grid>
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Braço Esquerdo</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.leftArm} cm</Text>
              </Col>
              
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Braço Direito</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.rightArm} cm</Text>
              </Col>
            </Grid>

            <Text style={Styles.ExerciseTitle}> </Text>

            <Grid>
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Abdômen</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.abdomen} cm</Text>
              </Col>
              
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Cintura</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.waist} cm</Text>
              </Col>

              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Quadril</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.hips} cm</Text>
              </Col>
            </Grid>

            <Text style={Styles.ExerciseTitle}> </Text>
            
            <Grid>
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Coxa Esquerda</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.leftThigh} cm</Text>
              </Col>
              
              <Col style={Styles.ExerciseCol}>
                <Text style={[{textAlign: 'center'}, Styles.ExerciseColTitle]}>Coxa Direita</Text>
                <Text style={Styles.ExerciseColSubTitle}>{bodyMeasurementParam?.rightThigh} cm</Text>
              </Col>
            </Grid> 
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
