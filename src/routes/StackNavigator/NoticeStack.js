import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notice from '../../components/Notice';
import NoticeDetails from '../../components/Notice/NoticeDetails';

const NoticeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerTitleStyle: {fontFamily: 'Spectral-Light'}}}>
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{
          title: 'Notice',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="NoticeDetails"
        component={NoticeDetails}
        options={{
          title: 'Notice Details',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default NoticeStack;
