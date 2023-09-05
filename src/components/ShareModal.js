import React, { useEffect } from 'react';
import {View, ScrollView, StyleSheet, Linking, Alert, TouchableOpacity} from 'react-native';
import { Text, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfigApp from '../config/ConfigApp';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function ShareModal(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const {isVisible, closeModal, isPost, itemData} = props;

  const itemUrlPost = `${ConfigApp.URL}single-post.php?id=${itemData.id}&lang=${language}`;
  const itemUrlProperty = `${ConfigApp.URL}single-property.php?id=${itemData.id}&lang=${language}`;


  useEffect(() => {

  }, []);

  const closeModalForm = () => {
    closeModal();
  }

  const viaFacebook = () => {
    let url = encodeURI('https://facebook.com/sharer/sharer.php?u='+(isPost ? itemUrlPost : itemUrlProperty));
    Linking.openURL(url).then((data) => {
    }).catch(() => {
      Alert.alert('Error',
        'An error occurred while share',
        {cancelable: true})
    });
  }

  const viaTwitter = () => {
    let url = encodeURI('https://twitter.com/intent/tweet/?text='+itemData.title+'\n'+(isPost ? itemUrlPost : itemUrlProperty));
    Linking.openURL(url).then((data) => {
    }).catch(() => {
      Alert.alert('Error',
        'An error occurred while share',
        {cancelable: true})
    });
  }

  const viaWhatsapp = () => {
    let url = encodeURI('whatsapp://send?text='+itemData.title+'\n'+(isPost ? itemUrlPost : itemUrlProperty));
    Linking.openURL(url).then((data) => {
    }).catch(() => {
      Alert.alert('Error',
        'An error occurred while share',
        {cancelable: true})
    });
  }

  const viaTelegram = () => {

    let url = encodeURI('tg://msg?text='+itemData.title+'\n'+(isPost ? itemUrlPost : itemUrlProperty));
    Linking.openURL(url).then((data) => {
    }).catch(() => {
      Alert.alert('Error',
        'An error occurred while share',
        {cancelable: true})
    });
  }

return(
  <Portal>
  <Modal visible={isVisible} onDismiss={() => closeModalForm()} contentContainerStyle={innerStyles.selectModal}>

  <View style={{paddingVertical: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee', marginTop: 3, marginBottom: 10, borderRadius: 6}}>
  <Text style={{fontWeight: '500', fontSize: 16}}>{Strings.ST92}</Text>
  </View>

  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
  <View style={innerStyles.container}>
  
  <View style={innerStyles.item}>
  <TouchableOpacity underlayColor={"#fff"} activeOpacity={0.9} style={[innerStyles.contentButton, innerStyles.facebook ]} onPress={() => viaFacebook()}>
  <Text style={innerStyles.labelButton}>Facebook</Text>
  <Icon name="facebook" style={innerStyles.iconButton}/>
  </TouchableOpacity>
  </View>

  <View style={innerStyles.item}>
  <TouchableOpacity underlayColor={"#fff"} activeOpacity={0.9} style={[innerStyles.contentButton, innerStyles.twitter ]} onPress={() => viaTwitter()}>
  <Text style={innerStyles.labelButton}>Twitter</Text>
  <Icon name="twitter" style={innerStyles.iconButton}/>
  </TouchableOpacity>
  </View>

  <View style={innerStyles.item}>
  <TouchableOpacity underlayColor={"#fff"} activeOpacity={0.9} style={[innerStyles.contentButton, innerStyles.whatsapp ]} onPress={() => viaWhatsapp()}>
  <Text style={innerStyles.labelButton}>Whatsapp</Text>
  <Icon name="whatsapp" style={innerStyles.iconButton}/>
  </TouchableOpacity>
  </View>

  <View style={innerStyles.item}>
  <TouchableOpacity underlayColor={"#fff"} activeOpacity={0.9} style={[innerStyles.contentButton, innerStyles.telegram ]} onPress={() => viaTelegram()}>
  <Text style={innerStyles.labelButton}>Telegram</Text>
  <Icon name="telegram" style={innerStyles.iconButton}/>
  </TouchableOpacity>
  </View>

  </View>
  </ScrollView>


  </Modal>
  </Portal>
  );

}

const innerStyles = StyleSheet.create({

selectModal:{
    alignSelf: 'center', 
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 6,
    width: '80%',
},

container:{
 flexDirection: 'column',  alignItems: 'center'
},

item:{
  width: '100%'
},

  contentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45
  },
  labelButton: {
    color: '#ffffff',
    fontSize: 16
  },
  iconButton: {
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 5
  },
  facebook: {
    backgroundColor: '#3b5998',
  },
  twitter: {
    backgroundColor: '#1ea2f1',
  },
  whatsapp: {
    backgroundColor: '#25d366',
  },
  telegram: {
    backgroundColor: '#0088cc',
  },
})
