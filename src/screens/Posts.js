import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getLatestPosts } from "../config/DataApp";
import {map} from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import moment from 'moment';

export default function Posts(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";
  
  const onClickItem = (id, title) => {
    props.navigation.navigate('postdetails', {id, title});
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getLatestPosts(page+1).then((response) => {

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
      <View style={{marginTop:20}}>
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={6}
      Click={() => loadMore()}/>
      </View>
      )
  }

  useEffect(() => {
    getLatestPosts().then((response) => {
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
    <List.Item
    key={i}
    title={item.title}
    titleStyle={{fontWeight: 'bold', fontSize:15, marginBottom: 3}}
    activeOpacity={1}
    titleNumberOfLines={2}
    description={moment(item.date).fromNow()}
    underlayColor="transparent"
    rippleColor="transparent"
    left={props => <Avatar.Image size={70} style={{marginRight: 10}} source={{uri: item.image}} />}
    right={props => <List.Icon {...props} icon={rightIcon}
    style={{alignSelf: 'center', opacity: 0.3, marginBottom:30}}/>}
    />
    </TouchableOpacity>

          ))}

    {renderButton()}

    </View>
    </SafeAreaView>
    </ScrollView>

      );

}

}


