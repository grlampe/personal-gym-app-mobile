import React, { useContext } from 'react';
import { View, ScrollView, SafeAreaView, Image, ImageBackground, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function Home(props: HomeProps) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";
  const sizeIcon = 56;

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <View>
          <ImageBackground source={require('../../assets/bg.jpg')} style={Styles.HomeImage} resizeMode={'cover'}>
            <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.HomeGradient}>
              <Image source={require('../../assets/logo-white.png')} resizeMode={"contain"} style={Styles.HomeLogo} />
            </LinearGradient>
          </ImageBackground>

          <View style={Styles.HomeMenu}>
            <List.Item
              title={Strings.ST5}
              titleStyle={Styles.HomeLabel}
              style={Styles.HomeIconList}
              onPress={() => onChangeScreen("workouts")}
              underlayColor="transparent"
              rippleColor='transparent'
              left={(props) => <Icon {...props} style={Styles.HomeIcon} size={sizeIcon} color={ColorsApp.PRIMARY} name="dumbbell" />}
              right={(props) => <List.Icon {...props} style={Styles.HomeIconRight} icon={rightIcon} />}
            />

            <List.Item
              title={Strings.ST21}
              titleStyle={Styles.HomeLabel}
              style={Styles.HomeIconList}
              onPress={() => onChangeScreen("exercises")}
              underlayColor="transparent"
              rippleColor='transparent'
              left={(props) => <Icon {...props} style={Styles.HomeIcon} size={sizeIcon} color={ColorsApp.PRIMARY} name="human-male-height" />}
              right={(props) => <List.Icon {...props} style={Styles.HomeIconRight} icon={rightIcon} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
