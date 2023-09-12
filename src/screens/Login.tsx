import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Image,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import { AuthContext } from '../context/auth.context';

interface Props {
  navigation: any;
}

export default function Login(_: Props) {
  const { signIn } = useContext(AuthContext);
  const contextState = useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const login = async () => {
    setLoading(true);
    if (username && password) {
      await signIn({ username, password });
    } else {
      setLoading(false);
      Alert.alert(Strings.ST33);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Image
        source={
          theme === 'dark'
            ? require('../../assets/logo-white.png')
            : require('../../assets/logo.png')
        }
        resizeMode={'contain'}
        style={Styles.AuthLogo}
      />

      <View style={Styles.AuthContent}>
        <TextInput
          label={Strings.ST19}
          onChangeText={(text) => setUsername(text.trim())}
          mode="flat"
          autoCapitalize="none"
          style={Styles.AuthInput}
        />
        <TextInput
          label={Strings.ST20}
          onChangeText={(text) => setPassword(text)}
          mode="flat"
          secureTextEntry={true}
          style={Styles.AuthInput}
        />
        <Button
          mode="contained"
          onPress={async () => await login()}
          dark={theme === 'dark' ? false : true}
          style={Styles.AuthButton}
          contentStyle={Styles.AuthButtonContent}
          labelStyle={Styles.AuthButtonLabel}
        >
          {!loading ? Strings.ST17 : Strings.ST31}
        </Button>
      </View>
    </SafeAreaView>
  );
}
