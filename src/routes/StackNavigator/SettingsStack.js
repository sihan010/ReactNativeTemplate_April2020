import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../../components/Settings/index';

const SettingsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Spectral-Light',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
