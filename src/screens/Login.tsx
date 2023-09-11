import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import usePreferences from '../hooks/usePreferences';
import { AuthContext } from '../context/Authenticate';

export default function Login(props) {
  const { signIn } = React.useContext(AuthContext);
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

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
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onChangeScreen('forgot')}
        >
          <Text style={Styles.ForgotPass}>{Strings.ST15}</Text>
        </TouchableOpacity>
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

        <View style={Styles.AuthBottomContent}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onChangeScreen('register')}
          >
            <Text style={Styles.AuthBottomText}>
              {Strings.ST12}{' '}
              <Text style={{ fontWeight: 'bold' }}>{Strings.ST35}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
