import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

import React from 'react';
import SplashScreen from 'react-native-splash-screen';

const lightTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#B00020',
    text: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
  },
  fonts: {
    regular: {fontFamily: 'Spectral-Regular', fontWeight: 'normal'},
    medium: {fontFamily: 'Spectral-Medium', fontWeight: 'normal'},
    light: {fontFamily: 'Spectral-Light', fontWeight: 'normal'},
    thin: {fontFamily: 'Spectral-ExtraLight', fontWeight: 'normal'},
  },
  animation: {scale: 1},
};

const darkTheme = {
  dark: true,
  roundness: 4,
  colors: {
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    text: '#ffffff',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: 'rgba(255, 255, 255, 0.38)',
    placeholder: 'rgba(255, 255, 255, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#ff80ab',
  },
  fonts: {
    regular: {fontFamily: 'sans-serif', fontWeight: 'normal'},
    medium: {fontFamily: 'sans-serif-medium', fontWeight: 'normal'},
    light: {fontFamily: 'sans-serif-light', fontWeight: 'normal'},
    thin: {fontFamily: 'sans-serif-thin', fontWeight: 'normal'},
  },
  animation: {scale: 1},
  mode: 'adaptive',
};

const ThemeWrapper = props => {
  SplashScreen.hide();
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#5D6D7E', true);
    StatusBar.setBarStyle('light-content', true);
  } else {
    StatusBar.setBarStyle('dark-content', true);
  }
  return <PaperProvider theme={DefaultTheme}>{props.children}</PaperProvider>;
};

export default ThemeWrapper;
