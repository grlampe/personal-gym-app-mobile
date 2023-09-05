import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getDietsByUser } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadMoreButton from '../components/LoadMoreButton';
import NoContentFound from '../components/NoContentFound';

const auth = getAuth();

export default function CustomDiets(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  
  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    props.navigation.navigate('dietdetails', {id, title});
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getDietsByUser(auth.currentUser.uid, page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={5}
      Click={() => loadMore()}/>
      )
  }

  useEffect(() => {

    getDietsByUser(auth.currentUser.uid).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);

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
    <ImageBackground source={{uri: item.image}} style={Styles.card3_background} imageStyle={{borderRadius: 8}}>
      <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>

        <Text numberOfLines={1} style={Styles.card3_category}>{item.category}</Text>
        <Text numberOfLines={2} style={Styles.card3_title}>{item.title}</Text>
        <Text numberOfLines={1} style={[Styles.card3_subtitle, {opacity:0.6}]}>{item.calories} {Strings.ST46} | {Strings.ST62} {item.servings}</Text>

      </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>

          ))}

    {renderButton()}

    <NoContentFound data={items}/>

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


