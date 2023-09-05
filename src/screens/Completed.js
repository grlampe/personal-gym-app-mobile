import React from 'react';
import { View } from 'react-native';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getWorkoutById } from "../config/DataApp";
import { Button, IconButton, Text } from 'react-native-paper';
import ColorsApp from '../config/ColorsApp';
import { Grid, Row } from 'react-native-easy-grid';


export default function Completed(props) {

  const { route } = props;
  const { id, total, time } = route.params;

  const [item, setItem] = React.useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  React.useEffect(() => {

    getWorkoutById(id).then((response) => {
        setItem(response[0]);
    });
  }, []);

 return (

<View style={{flex:1}}>
  
  <Grid>

      <Row style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <View iterationCount={5}>
      <IconButton icon="trophy" color={ColorsApp.PRIMARY} size={80} style={{alignSelf:'center'}}/>
      <Text style={{alignSelf:'center', fontSize:32, fontWeight:'bold', marginBottom: 10}}>{Strings.ST133}</Text>
      <Text style={{alignSelf:'center', fontSize: 16}}>{Strings.ST134}</Text>
      </View>
      </Row>

    <Row style={{flexDirection:'column', justifyContent:'flex-start'}}>
    <View>

    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
      <IconButton icon="lightning-bolt" color={ColorsApp.PRIMARY} size={30}/>
      <Text style={{fontSize: 18}}>{Strings.ST135} {item.level}</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
      <IconButton icon="dumbbell" color={ColorsApp.PRIMARY} size={30}/>
      <Text style={{fontSize: 18}}>{Strings.ST136} {total}</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
      <IconButton icon="timer-outline" color={ColorsApp.PRIMARY} size={30}/>
      <Text style={{fontSize: 18}}>{Strings.ST137}
      {time.hours ? ' '+time.hours+' Hour' : null}
      {time.minutes ? ' '+time.minutes+' Minutes' : null}
      </Text>
    </View>

    </View>

    <View>
      <Button mode="contained"
      style={{elevation:0, borderRadius: 100, width: 150, alignSelf:'center', paddingVertical:5, marginTop:30}}
      labelStyle={{letterSpacing: 0}} onPress={() => props.navigation.navigate('home')}>
      {Strings.ST138}
      </Button>
      </View>
    
      </Row>

  </Grid>

</View>

      );

}


