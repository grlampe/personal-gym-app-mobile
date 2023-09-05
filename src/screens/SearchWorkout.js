import React, { useState, useEffect } from 'react';
import { View, ScrollView, I18nManager } from 'react-native';
import AppLoading from '../components/InnerLoading';
import {searchWorkout} from "../config/DataApp";
import { map, size } from "lodash";
import Styles from '../config/Styles';
import { List, Avatar, Text, Searchbar } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import EmptyResults from '../components/EmptyResults';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SearchWorkout(props) {

	const contextState = React.useContext(LanguageContext);
	const language = contextState.language;
	const Strings = Languages[language].texts;

	const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    props.navigation.navigate('workoutdetails', {id, title});
  };

  useEffect(() => {

      searchRequest();
      setIsLoaded(true);

  }, [query]);

  const searchRequest = () => {

      if (size(query) >= 3) {

        searchWorkout(query, page).then((response) => {
              setResults(response);
              setTotal(response.length);
            });
      }

  }

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    searchWorkout(query, page+1).then((response) => {

      if (!results) {
        setResults(response);
        setLoading(false);
      }else{
        setResults([...results, ...response]);
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
        <LoadMoreButton Indicator={loading} showButton={showButton} Items={results} Num={5} Click={() => loadMore()}/>
      </View>
      )
  }

  if (isLoaded) {

      return(

    <View>

    <Searchbar
    placeholder={Strings.ST54}
    autoCorrect={false}
    autoCapitalize='none'
    onIconPress={() => searchRequest()}
    onChangeText={(e) => setQuery(e)}
    style={Styles.SearchInput}
    inputStyle={Styles.SearchInputStyle} />

    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    
    <View style={Styles.ContentScreen}>

        {map(results, (item, i) => (

<TouchableOpacity key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98}>
<List.Item
        key={i}
        title={item.title}
        titleStyle={{fontWeight: 'bold', fontSize:15, marginBottom: 3}}
        activeOpacity={1}
        titleNumberOfLines={2}
        description={item.duration +'  ·  '+ item.level}
        underlayColor="transparent"
        rippleColor="transparent"
        left={props => <Avatar.Image size={70} style={{marginRight: 10}} source={{uri: item.image}} />}
        right={props => <List.Icon {...props} icon={rightIcon} style={{alignSelf: 'center', opacity: 0.3}}
        style={{marginBottom:30}} />}
      />
      </TouchableOpacity>

          ))}

      {renderButton()}

      {size(results) <= 0 && size(query) >= 3 ? <View style={{marginTop: 50}}><EmptyResults/></View> : null }
  
    </View>

    <View style={{height: 80}}></View>

    </ScrollView>

    </View>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

