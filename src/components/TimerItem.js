import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import ColorsApp from '../config/ColorsApp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

export default function TimerItem(props) {

const {data, stop, currentPage, lastPage, workoutId, totalItems} = props;

const navigation = useNavigation();

const refVideo2 = React.useRef(null);
const [isPlaying, setIsPlaying] = React.useState(false);
const [nextSet, setnextSet] = React.useState(false);
const [finished, setFinished] = React.useState(false);
const [isEnd, setIsEnd] = React.useState(false);
const [reps, setReps] = React.useState(1);
const [sets, setSets] = React.useState(1);
const [rest, setRest] = React.useState(false);
const [timeLeft, setTimeLeft] = React.useState(60);
const [totaltime, setTotaltime] = React.useState({ seconds: 0, minutes: 0, hours: 0, });

const { width, height } = Dimensions.get("window");

const contextState = React.useContext(LanguageContext);
const language = contextState.language;
const Strings = Languages[language].texts;

const PlayPause = () => {
  setIsPlaying(!isPlaying);
}

React.useEffect(() => {

  let isCancelled = false;

  const advanceTime = () => {
    setTimeout(() => {
      let nSeconds = totaltime.seconds;
      let nMinutes = totaltime.minutes;
      let nHours = totaltime.hours;

      nSeconds++;

      if (nSeconds > 59) {
        nMinutes++;
        nSeconds = 0;
      }
      if (nMinutes > 59) {
        nHours++;
        nMinutes = 0;
      }
      if (nHours > 24) {
        nHours = 0;
      }

      !isCancelled && setTotaltime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
    }, 1000);
  };
 
    if(isPlaying || rest){
      advanceTime();
    }

    return () => {
      isCancelled = true;
    };


}, [totaltime, isPlaying]);

React.useEffect(() => {

  if(currentPage === lastPage){
    setIsEnd(true);
  }else{
    setIsEnd(false);
  }
  
  }, [currentPage]);

React.useEffect(() => {
  
if(rest){

  if (!timeLeft) return;

  const intervalId = setInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);

  return () => clearInterval(intervalId);

}

}, [rest, timeLeft]);

React.useEffect(() => {

  if(reps === data.reps){
    if(data.sets === sets){

      if(isEnd){
          setTimeout(() => {
          navigation.navigate('completed', {id: workoutId, total: totalItems, time: totaltime});
         },1000);

      }else if(!isEnd){
        setTimeout(() => {
          setFinished(true);
         },1000);
      }
    }else{
    setTimeout(() => {
      setRest(true);
     },1000);
    }
  }

}, [reps]);

React.useEffect(() => {

  if(timeLeft === 0){
    if(sets < data.sets){
      setSets(sets+1);
      setReps(1);
      setnextSet(true);
      setTimeLeft(60);
      setRest(false);
    }
  }

}, [timeLeft]);

React.useEffect(() => {

  if(isPlaying){
    if (!reps) return;
    const intervalId = setInterval(() => {
      if(reps < data.reps){
        setReps(reps + 1);
      }else{
        setnextSet(true);
        setIsPlaying(false);
      }
    }, 2500);

    return () => clearInterval(intervalId);

  }

}, [reps, isPlaying]);

React.useEffect(() => {

    if(stop === false){
      setIsPlaying(false);
    }

}, [stop]);

const renderButton = () => {

  if(!finished){
  if(!nextSet && !rest){

    return(
            <Button
            icon={isPlaying ? "pause" : "play"}
            mode="contained"
            onPress={() => PlayPause()}
            labelStyle={{fontSize:20, fontWeight:'bold'}}
            contentStyle={{width:'100%', paddingVertical:10}}
            style={{
                elevation: 0,
                marginTop:30,
                borderRadius:100,
                margin: 6
            }}>
            {isPlaying ? Strings.ST130 : Strings.ST129}
            </Button>
    )

  }else if(!rest){

    return(
      <Button
      icon={isPlaying ? "pause" : "play"}
      mode="contained"
      onPress={() => PlayPause()}
      labelStyle={{fontSize:20, fontWeight:'bold'}}
      contentStyle={{width:'100%', paddingVertical:10}}
      style={{
          elevation: 0,
          marginTop:30,
          borderRadius:100,
          margin: 6
      }}>
      {isPlaying ? Strings.ST130 : Strings.ST129}
      </Button>
      )
    }
  }
}

const renderContent = () => {

  if(!finished && !rest){
    
    return(

            <View>
            <View style={{flexDirection:'row'}}>
            <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:56, fontWeight:'bold'}}>{reps}</Text>
            <Text style={{fontSize:46}}>/</Text>
            <Text style={{fontSize:46}}>{data.reps}</Text>
            </View>
            <Text>{Strings.ST83}</Text>
            </View>

            <View style={{flexDirection:'column', alignItems:'center', marginHorizontal:20}}></View>

            <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:56, fontWeight:'bold'}}>{sets}</Text>
            <Text style={{fontSize:46}}>/</Text>
            <Text style={{fontSize:46}}>{data.sets}</Text>
            </View>
            <Text>{Strings.ST82}</Text>
            </View>
            </View>
            </View>
    )

  }

}

const renderRest = () => {

  if(rest && !finished){
    
    return(

      <View style={{flex: 1, height: height, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <View style={{flexDirection:'column', justifyContent:'center', borderRadius:100, alignItems:'center', marginHorizontal:20, borderColor: ColorsApp.PRIMARY, borderWidth:15, width:200, height:200, marginTop:-60}}>
      <Text style={{fontSize:66, fontWeight:'bold', color:ColorsApp.PRIMARY}}>{timeLeft}"</Text>
      </View>
      <Text style={{fontSize:26, fontWeight:'bold', marginTop:20}}>{Strings.ST131}</Text>
      </View>

    )

  }

}

  return(
          <View style={{flex: 1, alignContent:'center', alignItems:'center', width:width, height: height}}>
            
            {!rest && !finished ? <VideoPlayer
              /*playbackCallback={(e) => {
                if (e.didJustFinish) {
                  setIsPlaying(false);
                 }
              }}*/
              videoProps={{
                shouldPlay: isPlaying,
                positionMillis: 0,
                resizeMode: ResizeMode.CONTAIN,
                isLooping: true,
                isMuted:true,
                source: {
                  uri: data.video,
                },
                /*posterSource: {
                  uri: data.image,
                },
                usePoster: true,*/
                ref: refVideo2,
              }}
              fullscreen={{
                visible: false,
              }}
              pause={stop}
              repeat={true}
              defaultControlsVisible={true}
              slider={{
                visible: false,
              }}
              icon={{
                play: <></>,
                pause: <></>,
              }}
              timeVisible={false}
              style={{
                videoBackgroundColor: 'transparent',
                controlsBackgroundColor: 'transparent',
                alignSelf:'center',
                height: height*0.45,
                width: width,
              }}
            /> : null}

            {!finished && !rest ? <Text style={{fontSize:16, marginBottom:30, marginTop:0}}>
            {data.title}
            </Text> : null}

            {finished ? <View style={{maxWidth: 300, height: height, flex: 1, alignContent:'center', alignItems:'center', flexDirection:'row'}}>
            <View style={{flexDirection:'column', alignItems:'center', marginTop:-70}}>
            <Icon name="checkbox-marked-circle-outline" style={{color:ColorsApp.PRIMARY, fontSize: 72, marginBottom:10}}/>
            <Text style={{fontSize:34, fontWeight:'bold', textAlign:'center'}}>{Strings.ST132}</Text>
            </View>
            </View> : null}

            <View style={{flexDirection:'row'}}>
            {renderContent()}
            {renderRest()}
            </View>

            {renderButton()}

          </View>
    );
}