import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context/AuthCntext';
import IntroSlider from '../components/IntroSlider';
import Loading from '../components/Extra/Loading';
import LoginStack from './StackNavigator/LoginStack';
import MainBottomTabNavigator from './TabNavigator/MainBottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import ProfileStack from './StackNavigator/ProfileStack';
import {validate} from '../../util/AuthApiMethods';

const RouteToggler = props => {
  const {
    isAuthorized,
    isVerified,
    setIsVerified,
    setIsAuthorized,
    setToken,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    startupAuthenticator();
  }, []);

  const startupAuthenticator = async () => {
    let introStorage = await AsyncStorage.getItem('@teramoto_intro');
    if (introStorage === null) {
      setIntro(true);
    } else {
      let intro = JSON.parse(introStorage);
      !intro.viewed ? setIntro(true) : null;
    }

    let tokenStorage = await AsyncStorage.getItem('@teramoto_token');
    let token = JSON.parse(tokenStorage);
    //console.log(token);
    if (token) {
      try {
        let tokenValidated = await validate(token);
        if (tokenValidated) {
          setToken(token);
          setIsVerified(true);
          setIsAuthorized(true);
          setLoading(false);
        } else {
          await AsyncStorage.removeItem('@teramoto_token');
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const introDone = val => {
    setIntro(false);
    AsyncStorage.setItem('@teramoto_intro', JSON.stringify({viewed: true}));
  };

  const introSkipped = val => {
    setIntro(false);
    AsyncStorage.setItem('@teramoto_intro', JSON.stringify({viewed: false}));
  };

  let loggedIn = false;
  if (isAuthorized && isVerified) loggedIn = true;

  return (
    <NavigationContainer>
      {loading ? (
        <Loading />
      ) : loggedIn ? (
        intro ? (
          <IntroSlider onDone={introDone} onSkip={introSkipped} />
        ) : (
          <MainBottomTabNavigator />
        )
      ) : (
        <LoginStack />
      )}
    </NavigationContainer>
  );
};

export default RouteToggler;
