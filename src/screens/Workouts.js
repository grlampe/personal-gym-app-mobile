import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getLatestWorkouts } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LevelRate from '../components/LevelRate';
import LoadMoreButton from '../components/LoadMoreButton';
import { Grid, Col } from 'react-native-easy-grid';

export default function Workouts(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  
  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    props.navigation.navigate('workoutdetails', {id, title});
  };

  const buttonSearch = () => {
    return (
      <IconButton icon="magnify" size={24} iconColor="white" style={{marginLeft:15}} onPress={() => onChangeScreen('searchworkout')}/>
      )
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getLatestWorkouts(page+1).then((response) => {

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
  
    props.navigation.setOptions({
        headerRight: () => buttonSearch()
    });
  
  }, []);

  useEffect(() => {
    getLatestWorkouts().then((response) => {
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

      <Grid style={{marginTop: 5, marginBottom: 10, marginHorizontal: 5}}>
        <Col style={{margin: 5}}>
        <Button icon="lightning-bolt" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('goals')}>
          {Strings.ST52}
        </Button>
        </Col>
        <Col style={{margin: 5}}>
        <Button icon="equalizer" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('levels')}>
          {Strings.ST53}
        </Button>
        </Col>
        </Grid>

    {map(items, (item, i) => (
    
    <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item.id, item.title)} activeScale={0.98}>
    <ImageBackground source={{uri: item.image}} style={Styles.card3_background} imageStyle={{borderRadius: 8}}>
      <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>

      {/*<View style={Styles.card3_viewicon}>
      <Icon name="lock" color={ColorsApp.PRIMARY} size={15}></Icon>
      <Text style={Styles.card3_icon}>{Strings.ST26}</Text>
    </View>*/}

      <View style={Styles.card3_viewicon}>
        {item.rate ? <LevelRate rate={item.rate}/> : null}
      </View>
      
        <Text numberOfLines={2} style={Styles.card3_title}>{item.title}</Text>
        <Text numberOfLines={2} style={Styles.card3_subtitle}>{item.duration}</Text>

      </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>

          ))}

    {renderButton()}

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


