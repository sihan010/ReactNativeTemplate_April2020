import React, {useContext, useEffect} from 'react';
import WdmStack from '../StackNavigator/WdmStack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NoticeStack from '../StackNavigator/NoticeStack';
import ProfileStack from '../StackNavigator/ProfileStack';
import SettingsStack from '../StackNavigator/SettingsStack';
import {withTheme} from 'react-native-paper';
import {AuthContext} from '../../context/AuthCntext';
import {getInternalAPI} from '../../../util/APIMethods';

const MainBottomTabNavigator = ({theme}) => {
  const Tab = createMaterialBottomTabNavigator();
  const {unreadNotice, setNoticeCount, token} = useContext(AuthContext);
  // useEffect(() => {
  //   let endpoint = `noticemanage/getnoticesbypage?page=1`;
  //   getInternalAPI(endpoint, token).then(data => {
  //     if (data) {
  //       setNoticeCount(data.unread);
  //       setLoading(false);
  //       return;
  //     }
  //     setLoading(false);
  //   });
  // }, []);
  return (
    <Tab.Navigator
      //lazy={false}
      initialRouteName="wdmStack"
      activeColor="#EAECEE"
      inactiveColor="#ABB2B9"
      backBehavior="history"
      keyboardHidesNavigationBar={true}
      labeled={true}>
      <Tab.Screen
        name="WdmStack"
        component={WdmStack}
        options={{
          title: 'WDM Items',
          tabBarLabel: 'WDM Items',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="transition" color={color} size={26} />
          ),
          tabBarColor: '#34495E',
        }}
      />
      <Tab.Screen
        name="NoticeStack"
        component={NoticeStack}
        options={{
          title: 'Notice',
          tabBarLabel: 'Notice',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
          tabBarColor: '#2980B9',
          tabBarBadge: unreadNotice > 0 ? unreadNotice : null,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-details"
              color={color}
              size={26}
            />
          ),
          tabBarColor: '#0E6655',
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: 'Setting',
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cogs" color={color} size={26} />
          ),
          tabBarColor: '#AF601A',
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(MainBottomTabNavigator);
