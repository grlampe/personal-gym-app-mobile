import React, { useState } from 'react';
import { View, ScrollView, I18nManager } from 'react-native';
import { RadioButton, Switch, Paragraph, List} from 'react-native-paper';
import {map} from 'lodash';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import * as Updates from 'expo-updates';
import CustomModal from '../components/CustomModal';
import usePreferences from '../hooks/usePreferences';

export default function Settings(props) {

    const {navigation} = props;
    const [modal, showModal] = useState(false); 
    const contextState = React.useContext(LanguageContext);
    let language = contextState.language;
    const Strings = Languages[language].texts;
    const {theme, toggleTheme} = usePreferences();

    let languageNames = Object.values(Languages);
    languageNames = languageNames.map((l) => { return { label: l.label, value: l.value } })

    const toggleLanguage = (selectedLanguage) => {

      if (selectedLanguage === "ar") {
        I18nManager.forceRTL(true)
      }
      else {
        I18nManager.forceRTL(false)
      }
      contextState.updateValue(selectedLanguage);

      showModal(true);

      setTimeout(() => {
        Updates.reloadAsync();
      }, 1000);

    }

 return (

  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <CustomModal isVisible={modal} modalText={Strings.ST31} showIndicator={true}/>
    <View style={Styles.ContentScreen}>

      <List.Item
        title={Strings.ST109}
        titleStyle={{fontWeight: 'bold'}}
        style={{marginBottom: 10, borderBottomWidth: 1, borderColor: theme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}}
      />

      <RadioButton.Group onValueChange={value => value !== language ? toggleLanguage(value) : null} value={language}>
      {map(languageNames, (item, index) => (
        <RadioButton.Item mode="android" key={index} label={item.label} value={item.value} />
        ))}

      </RadioButton.Group>

      <List.Item
        title={Strings.ST105}
        titleStyle={{fontWeight: 'bold'}}
        style={{marginBottom: 10, borderBottomWidth: 1, borderColor: theme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}}
      />

      <View style={Styles.switchRow}>
        <Paragraph>{Strings.ST103}</Paragraph>
        <Switch value={theme === "dark" ? true : false} onValueChange={toggleTheme} />
      </View>


    </View>
    </ScrollView>

      );

}

