import React from 'react';
import { View, ScrollView, I18nManager } from 'react-native';
import { RadioButton, Switch, Paragraph, List } from 'react-native-paper';
import { map } from 'lodash';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';

interface SettingsProps {
  navigation: any;
}

type LanguageItem = { label: string; value: string; };

export default function Settings(props: SettingsProps) {
  const contextState = React.useContext(LanguageContext);
  let language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme, toggleTheme } = usePreferences();

  let languageNames: LanguageItem[] = Object.keys(Languages).map((key) => ({
    label: Languages[key].label,
    value: key,
  }));

  const toggleLanguage = (selectedLanguage: string) => {
    I18nManager.forceRTL(false);
    contextState.updateValue(selectedLanguage);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={Styles.ContentScreen}>
        <List.Item
          title={Strings.ST109}
          titleStyle={{ fontWeight: 'bold' }}
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }}
        />

        <RadioButton.Group onValueChange={(value) => (value !== language ? toggleLanguage(value) : null)} value={language}>
          {map(languageNames, (item, index) => (
            <RadioButton.Item mode="android" key={index} label={item.label} value={item.value} />
          ))}
        </RadioButton.Group>

        <List.Item
          title={Strings.ST105}
          titleStyle={{ fontWeight: 'bold' }}
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }}
        />

        <View style={Styles.switchRow}>
          <Paragraph>{Strings.ST103}</Paragraph>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      </View>
    </ScrollView>
  );
}
