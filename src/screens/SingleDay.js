import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getWorkoutByDay } from "../config/DataApp";
import {map, size} from 'lodash';
import AppLoading from '../components/InnerLoading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, Text, FAB } from 'react-native-paper';
import ColorsApp from '../config/ColorsApp';
import RestDay from '../components/RestDay';

export default function SingleDay(props) {

    const { route } = props;
    const { navigation } = props;
    const { id, day, title } = route.params;

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

    const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

    const onClickItem = (id, title) => {
      navigation.navigate('exercisedetails', {id, title});
    };

    const onClickStart = (id, day) => {
      navigation.navigate('timer', {id, day});
    };

    useEffect(() => {

        props.navigation.setOptions({
          title:title,
        });
      
      }, []);

    useEffect(() => {
        getWorkoutByDay(id, day).then((response) => {
            setItems(response);
            setIsLoaded(true);
        });
      }, []);

    if (!isLoaded) {

        return (
       
              <AppLoading/>
       
             );
       
          }else{
    
if(size(items) >= 1){

    return (
    
      <View style={{flex: 1}}>
          <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
          
      <SafeAreaView>
      
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
          left={props => 
            <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
              <Text style={{marginHorizontal:15, color: ColorsApp.PRIMARY, fontSize:18, fontWeight:'bold'}}>{i+1+'º'}</Text>
              <View style={Styles.itemListView2}>
            <Image source={{uri: item.image}} style={Styles.itemListImage2} resizeMode={"center"} />
            </View>
            </View>}
          right={props => <List.Icon {...props} icon={rightIcon} style={{alignSelf: 'center'}} style={{opacity:0.5, alignSelf:'center'}} />}
          />
          </TouchableOpacity>
  
            ))}

          </SafeAreaView>
          </ScrollView>

          <View>
            <FAB
          style={{marginHorizontal: 50, marginBottom:20, elevation: 0}}
          label={Strings.ST122}
          icon="play"
          onPress={() => onClickStart(id, day)}
          />
          </View>

</View>

      
            );

}else{
    return(

        <RestDay/>

    )
}
    
    }
    
    }
    
    
    