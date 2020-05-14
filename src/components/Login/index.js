import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {login} from '../../../util/AuthApiMethods';
import {AuthContext} from '../../context/AuthCntext';
import AsyncStorage from '@react-native-community/async-storage';
import {Snackbar, TextInput, Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = props => {
  const {setToken, setIsAuthorized, setIsVerified} = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginPressed = async () => {
    setLoading(true);
    let credentials = {
      userId: userId,
      password: password,
    };

    let data = await login(credentials);
    if (data === null) {
      setErrorMessage('User Id or Password is Wrong !');
      setLoading(false);
      setIsError(true);
      return;
    }
    //console.log(data);
    setLoading(false);
    setToken(data.token);

    setIsAuthorized(true);
    setIsVerified(true); //Just got the token, it must be valid
    await AsyncStorage.setItem('@teramoto_token', JSON.stringify(data.token));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Icon name="city" size={150} color="#34495E" />
            <Text style={styles.header}>BIHIN</Text>
            <View style={styles.imputContainer}>
              <TextInput
                mode="outlined"
                label="ユーザー"
                value={userId}
                autoCompleteType="username"
                autoCapitalize="none"
                onChangeText={setUserId}
              />
              <TextInput
                mode="outlined"
                label="パスワード"
                value={password}
                secureTextEntry={true}
                autoCompleteType="password"
                autoCapitalize="none"
                onChangeText={setPassword}
              />
            </View>
            <Button
              loading={loading}
              icon="login"
              mode="contained"
              onPress={loginPressed}
              style={{width: '95%'}}>
              ログイン
            </Button>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 5,
              fontFamily: 'Spectral-Regular',
            }}>
            CopyRight © {new Date().getFullYear()} KCCS, All Rights Reserved
          </Text>

          <Snackbar
            visible={isError}
            onDismiss={() => setIsError(false)}
            action={{
              label: 'Ok',
              onPress: () => {
                setIsError(false);
              },
            }}
            duration={Snackbar.DURATION_SHORT}
            style={{
              backgroundColor: '#EC7063',
            }}>
            {errorMessage}
          </Snackbar>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
    alignSelf: 'center',
    color: '#34495E',
  },
  imputContainer: {
    width: '100%',
    marginHorizontal: 20,
    margin: 10,
    padding: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#34495E',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#5DADE2',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default Login;
