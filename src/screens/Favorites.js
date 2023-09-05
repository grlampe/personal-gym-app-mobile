import React from 'react';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ColorsApp from '../config/ColorsApp';
import usePreferences from '../hooks/usePreferences';
import WorkoutsFav from './WorkoutsFav';
import DietsFav from './DietsFav';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function Favorites(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const {theme} = usePreferences();
  
 return (


  <View style={{flex: 1}}>
    
    <Tab.Navigator 
    screenOptions={{
      tabBarIndicatorStyle: { backgroundColor: '#fff', padding:2 },
        tabBarLabelStyle: { fontSize: 16, textTransform: 'capitalize', fontWeight:'bold', color:'white' },
        tabBarStyle: { backgroundColor: ColorsApp.PRIMARY },
      }}
    >
      <Tab.Screen name={Strings.ST5} component={WorkoutsFav} />
      <Tab.Screen name={Strings.ST27} component={DietsFav} />
    </Tab.Navigator>


    </View>

      );

}


