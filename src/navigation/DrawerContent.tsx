import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, I18nManager } from 'react-native';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { List } from "react-native-paper";
import Styles from '../config/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props: any) {
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <TouchableOpacity onPress={() => onChangeScreen("home")} activeOpacity={0.8}>
        <View style={Styles.DrawerHeader}>
          <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.DrawerImage} />
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <List.Item
          titleStyle={Styles.DrawerTitleMenu}
          style={Styles.DrawerMenuItem}
          title={Strings.ST5}
          onPress={() => onChangeScreen("workouts")}
          underlayColor="transparent"
          rippleColor='transparent'
          right={(props) => <Icon {...props} style={Styles.DrawerIconRightMenu} name={rightIcon} />}
        />

        <List.Item
          titleStyle={Styles.DrawerTitleMenu}
          style={Styles.DrawerMenuItem}
          title={Strings.ST6}
          onPress={() => onChangeScreen("profile")}
          underlayColor="transparent"
          rippleColor='transparent'
          right={(props) => <Icon {...props} style={Styles.DrawerIconRightMenu} name={rightIcon} />}
        />

        <List.Item
          titleStyle={Styles.DrawerTitleMenu}
          style={Styles.DrawerMenuItem}
          title={Strings.ST108}
          onPress={() => onChangeScreen("settings")}
          underlayColor="transparent"
          rippleColor='transparent'
          right={(props) => <Icon {...props} style={Styles.DrawerIconRightMenu} name={rightIcon} />}
        />
      </View>
    </DrawerContentScrollView>
  );
}
