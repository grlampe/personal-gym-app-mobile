import React from 'react';
import { List } from 'react-native-paper';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function SelectItem(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const {title, description, onClick} = props;

return(
    <List.Item
      title={title}
      description={description}
      onPress={onClick}
      titleStyle={Styles.SearchListTitle}
      descriptionStyle={Styles.SearchListDesc}
      right={props => <List.Icon {...props} icon={"chevron-down"} />}
      rippleColor={'transparent'}
      style={Styles.SearchListStyle}
    />
  );

}