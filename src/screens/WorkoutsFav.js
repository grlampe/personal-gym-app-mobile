import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getFavWorkouts } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import NoContentFound from '../components/NoContentFound';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, Avatar} from 'react-native-paper';

export default function WorkoutsFav(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

	const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";
  
  const onClickItem = (id, title) => {
    props.navigation.navigate('workoutdetails', {id, title});
  };

  useEffect(() => {
    getFavWorkouts().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, [items]);

  if (!isLoaded) {

    return (
   
        <AppLoading/>
   
         );
   
      }else{

 return (

  <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
>
    
<SafeAreaView>

    <View style={Styles.ContentScreen}>

        {map(items, (item, i) => (

<TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item.id, item.title)} activeScale={0.98}>
<List.Item
        key={i}
        title={item.title}
        titleStyle={{fontWeight: 'bold', fontSize:15, marginBottom: 3}}
        activeOpacity={1}
        titleNumberOfLines={2}
        underlayColor="transparent"
        rippleColor="transparent"
        left={props => <Avatar.Image size={70} style={{marginRight: 10}} source={{uri: item.image}} />}
        right={props => <List.Icon {...props} icon={rightIcon} style={{alignSelf: 'center', opacity: 0.3}}
        style={{marginBottom:30}} />}
      />
      </TouchableOpacity>

          ))}
    
    <NoContentFound data={items}/>

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


