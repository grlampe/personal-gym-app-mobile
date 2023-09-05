import React, { useState, useEffect } from 'react';
import { getAuth, signOut, EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { ScrollView, View, Image, SafeAreaView, Alert } from 'react-native';
import AppLoading from '../components/InnerLoading';
import CustomButton from '../components/CustomButton';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { Text, Button, Paragraph, Dialog, Portal, TextInput, Title } from 'react-native-paper';

const auth = getAuth();

export default function Profile(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const deleteAccount = () => {

    if (password) {

      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );

      reauthenticateWithCredential(auth.currentUser, credential).then(() => {

        deleteUser(user).then(() => {
          // User deleted.
          }).catch((error) => {
            Alert.alert(Strings.ST32);
          });

      }).catch((error) => {
            Alert.alert(Strings.ST32);
      });
    }
  };

  const hideDialog = () => setVisible(false);

  useEffect(() => {

      setUser(auth.currentUser);
      setIsLoaded(true);

  }, []);

if(isLoaded) {

 return (

  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
  <SafeAreaView>

  <View style={Styles.HeaderProfile}>
    {user.photoURL ? <Image source={{uri: user.photoURL}} style={Styles.ImageProfile} resizeMode={"cover"}/>
    : <Image source={require('../../assets/male.jpg')} style={Styles.ImageProfile} resizeMode={"cover"}/>}
  
    <View style={{flexDirection: 'row'}}>
    {user.displayName ? <Text style={Styles.TextProfile}>{user.displayName}</Text> : null}
    {user.user_verified ? <Icon name="check-decagram" size={22} style={Styles.memberBadge}/> : null}
    </View>
  <Text style={Styles.SmallTextProfile}>{user.email}</Text>
  </View>

  <View style={{marginHorizontal: 30, marginBottom: 40}}>
  <CustomButton Icon="dumbbell" Label={Strings.ST50} Click={() => onChangeScreen("customworkouts")}/>
  <CustomButton Icon="silverware-fork-knife" Label={Strings.ST51} Click={() => onChangeScreen("customdiets")}/>
  <CustomButton Icon="heart-outline" Label={Strings.ST4} Click={() => onChangeScreen("favorites")}/>
  <CustomButton Icon="bookmark-outline" Label={Strings.ST110} Click={() => onChangeScreen("about")}/>
  <CustomButton Icon="file-document-outline" Label={Strings.ST8} Click={() => onChangeScreen("terms")}/>
  <CustomButton Icon="logout" Label={Strings.ST9} Click={() => signOut(auth)}/>
  <CustomButton Icon="account-cancel-outline" Label={Strings.ST141} Click={() => setVisible(true)}/>

  <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Title>{Strings.ST144}</Title>
          <Paragraph style={{marginVertical: 10}}>{Strings.ST145}</Paragraph>
          <TextInput
          value={password}
          mode="outlined"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        </Dialog.Content>
        <Dialog.Actions style={{marginBottom: 8, marginTop: -20, marginHorizontal: 8}}>
          <Button onPress={() => hideDialog()}>{Strings.ST142}</Button>
          <Button onPress={() => deleteAccount()}>{Strings.ST143}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

  </View>
  </SafeAreaView>
  </ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

