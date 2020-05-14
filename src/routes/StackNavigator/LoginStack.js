import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../components/Login';

const LoginStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
