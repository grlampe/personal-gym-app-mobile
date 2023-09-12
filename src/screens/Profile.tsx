import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView } from 'react-native';
import AppLoading from '../components/InnerLoading';
import CustomButton from '../components/CustomButton';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { Text } from 'react-native-paper';
import { AuthContext, User } from '../context/auth.context';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface ProfileProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export default function Profile(props: ProfileProps) {
  const { signOut, currentUser } = React.useContext(AuthContext);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const handleSignOut = async () => {
    signOut();
  }

  useEffect(() => {
    setUser(currentUser);
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Styles.HeaderProfile}>
            {user?.photoURL ? <Image source={{ uri: user?.photoURL }} style={Styles.ImageProfile} resizeMode={"cover"} />
              : <Image source={require('../../assets/male.jpg')} style={Styles.ImageProfile} resizeMode={"cover"} />}
            <View style={{ flexDirection: 'row' }}>
              {user?.name ? <Text style={Styles.TextProfile}>{user?.name}</Text> : null}
            </View>
            <Text style={Styles.SmallTextProfile}>{user?.email}</Text>
          </View>
          <View style={{ marginHorizontal: 30, marginBottom: 40 }}>
            <CustomButton Icon="dumbbell" Label={Strings.ST50} Click={() => onChangeScreen("customworkouts")} />
            <CustomButton Icon="bookmark-outline" Label={Strings.ST110} Click={() => onChangeScreen("about")} />
            <CustomButton Icon="file-document-outline" Label={Strings.ST8} Click={() => onChangeScreen("terms")} />
            <CustomButton Icon="logout" Label={Strings.ST9} Click={handleSignOut} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return (
      <AppLoading />
    );
  }
}
