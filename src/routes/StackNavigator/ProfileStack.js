import Profile from '../../components/Profile/index';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'BiHin',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            //fontFamily: 'Spectral-Light',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
