import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../components/WdmList';
import WdmItem from '../../components/WdmItem';
import ImageGallery from '../../components/ImageGallery';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerTitleStyle: {fontFamily: 'Spectral-Light'}}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Teramoto',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Details"
        component={WdmItem}
        options={{
          title: 'WDM Details',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={ImageGallery}
        options={{
          title: 'WDM Image Gallery',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
