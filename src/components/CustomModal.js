import React from 'react';
import ColorsApp from '../config/ColorsApp';
import { Portal, Card, Modal, ActivityIndicator } from 'react-native-paper';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';

export default function CustomModal(props){

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const {
    isVisible,
    modalText,
    showIndicator,
    indicatorColors
  } = props;

		return(

      <Portal>
      <Modal visible={isVisible}>
      <Card style={{width: '20%', flexDirection: 'column', alignSelf: 'center', paddingVertical: 20, borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
      
      {showIndicator === true ? 

      <ActivityIndicator animating={true} color={!indicatorColors ? ColorsApp.PRIMARY : indicatorColors} style={{marginHorizontal: 12}}/>
      : null
      }

      </Card>
      </Modal>
      </Portal>

			)
}


