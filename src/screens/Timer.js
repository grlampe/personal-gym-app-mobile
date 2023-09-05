import React from 'react';
import { View, ScrollView, SafeAreaView, Dimensions, Alert, BackHandler } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { getWorkoutByDay } from "../config/DataApp";
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import TimerItem from '../components/TimerItem';
import { map, size } from 'lodash';
import LoadingWorkout from '../components/LoadingWorkout';
import { Col, Grid } from 'react-native-easy-grid';
import ColorsApp from '../config/ColorsApp';
import { useKeepAwake } from 'expo-keep-awake';

export default function Timer(props) {

    useKeepAwake();

    const { route } = props;
    const { id, day } = route.params;

    const [sliderState, setSliderState] = React.useState({ currentPage: 0 });
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const { width } = Dimensions.get("window");

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;
  
    const scrollViewRef = React.useRef(null);
    
    const setSliderPage = (event) => {
      const { currentPage } = sliderState;
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor(x / width);
      if (indexOfNextScreen !== currentPage) {
        setSliderState({
          ...sliderState,
          currentPage: indexOfNextScreen,
        });
      }
    };

    const onPageIndex = () => {
      return pageIndex;
    }

    const toPrevExercise = () => {
      setIsPlaying(false);
      if (scrollViewRef.current !== null) {
            scrollViewRef.current.scrollTo({
                x: width * (pageIndex - 1),
                animated: true,
            });
        }

        onPageIndex();
      
    };

    const toNextExercise = () => {
        setIsPlaying(false);
        if (scrollViewRef.current !== null) {
            scrollViewRef.current.scrollTo({
                x: width * (pageIndex + 1),
                animated: true,
            });
        }

        onPageIndex();

    };

    const { currentPage: pageIndex } = sliderState;

    const confirmClose = () => {
      
    Alert.alert(
      Strings.ST123,
      Strings.ST124,
      [
        {
          text: Strings.ST125,
          style: "cancel"
        },
        { text: Strings.ST126, onPress: () => props.navigation.goBack() }
      ],
      { cancelable: false }
    );

    return true;

  };

    React.useEffect(() => {

      const backHandler = BackHandler.addEventListener('hardwareBackPress', confirmClose);
  
      return () => backHandler.remove();

    }, []);

    const buttonCloseColor = () => {
      return (
        <IconButton icon={"window-close"} color={ColorsApp.PRIMARY} style={{marginLeft:15}} size={24} onPress={() => confirmClose()}/>
        )
    };
    
    React.useEffect(() => {
    
      props.navigation.setOptions({
        headerLeft: () => buttonCloseColor()
      });
      
      }, []);

    React.useEffect(() => {

      setIsPlaying(null);

    }, [sliderState]);


      React.useEffect(() => {
        getWorkoutByDay(id, day).then((response) => {
            setItems(response);
            setIsLoaded(true);
        });

      }, []);

      if (!isLoaded) {

        return (
              <LoadingWorkout/>
             );
       
          }else{

      return (
      
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            scrollEnabled={false}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            snapToStart={true}
            onScroll={(event) => {
              setSliderPage(event);
            }}
          >

          {map(items, (item, i) => (
                <TimerItem
                data={item}
                stop={isPlaying}
                currentPage={onPageIndex()}
                lastPage={size(items)-1}
                workoutId={id}
                totalItems={size(items)}
                key={i}/>
          ))}

          </ScrollView>
  
        </SafeAreaView>
  
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal:30, marginVertical:20}}>
  
              <Grid>
            <Col style={{flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
            <Button
              disabled={pageIndex === 0 ? true : false}
              icon="arrow-left-bold"
              mode="text"
              onPress={() => toPrevExercise()}
              labelStyle={{fontSize:16, fontWeight:'bold'}}
              contentStyle={{width:'100%'}}
              style={{
                  elevation: 0,
                  borderRadius:100,
                  margin: 6
              }}>
              {Strings.ST127}
              </Button>
              </Col>

            <Col style={{flexDirection:'column', justifyContent:'center', alignItems:'flex-end'}}>
              <Button
              disabled={pageIndex === size(items) -1 ? true : false}
              icon="arrow-right-bold"
              mode="text"
              onPress={() => toNextExercise()}
              labelStyle={{fontSize:16, fontWeight:'bold'}}
              contentStyle={{width:'100%'}}
              style={{
                  elevation: 0,
                  borderRadius:100,
                  margin: 6
              }}>
              {Strings.ST128}
              </Button>
              </Col>
              </Grid>

            </View>
      </View>

    );
}

};
