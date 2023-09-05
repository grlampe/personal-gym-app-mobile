import * as React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { IconButton } from 'react-native-paper';

export default function Player(props) {

    const [inFullscreen2, setInFullsreen2] = React.useState(false);
    const refVideo2 = React.useRef(null);
    const { route } = props;
    const { url } = route.params;

    const closeVideo = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      props.navigation.goBack();
    };

    const openFullScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
      setInFullsreen2(!inFullscreen2)
      refVideo2.current.setStatusAsync({
        shouldPlay: true,
      })
    };

    const closeFullScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      setInFullsreen2(!inFullscreen2);
    };

    const buttonLeft = () => {
      return (<IconButton icon={"window-close"} color={"white"} style={{marginLeft:15}} size={24} onPress={() => closeVideo()}/>)
    };

    const buttonRight = () => {

      if(!inFullscreen2){
        return (<IconButton icon={"fullscreen"} color={"white"} style={{marginLeft:15}} size={24} onPress={() => openFullScreen()}/>)
      }

      if(inFullscreen2){
        return (<IconButton icon={"fullscreen-exit"} color={"white"} style={{marginLeft:15}} size={24} onPress={() => closeFullScreen()}/>)
      }

    };

    React.useEffect(() => {

      props.navigation.setOptions({
        headerLeft: () => buttonLeft(),
        headerRight: () => buttonRight()
    });
    
    }, [inFullscreen2]);

  return (
    <View style={styles.container}>
    <VideoPlayer
    videoProps={{
      shouldPlay: false,
      resizeMode: ResizeMode.CONTAIN,
      source: {
        uri: url,
      },
      ref: refVideo2,
    }}
    fullscreen={{
      visible: false,
    }}
    defaultControlsVisible={true}
    slider={{
      visible: false,
    }}
    timeVisible={false}
    repeat={true}
    icon={{
      play: <IconButton icon={"play-circle"} size={38} iconColor={"white"}/>,
      pause: <IconButton icon={"pause-circle"} size={38} iconColor={"white"}/>
    }}
    style={{
      alignSelf:'center',
      height: inFullscreen2 ? Dimensions.get('window').width : 220,
      width: inFullscreen2 ? Dimensions.get('window').height : 380,
    }}
  />
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    }
  });