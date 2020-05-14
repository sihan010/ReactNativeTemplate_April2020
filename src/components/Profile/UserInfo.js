import React, {useState, useEffect, useContext} from 'react';
import {View, Image} from 'react-native';
import {
  Avatar,
  Card,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native-paper';
import {AuthContext} from '../../context/AuthCntext';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_PROFILE_IMAGE} from 'react-native-dotenv';

const UserInfo = props => {
  const {setIsAuthorized, setIsVerified} = useContext(AuthContext);
  const userData = props.data;

  const logout = async () => {
    await AsyncStorage.removeItem('@teramoto_token');
    setIsAuthorized(false);
    setIsVerified(false);
  };

  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="ユーザー情報"
        subtitle="User Information"
        left={props => (
          <Avatar.Icon
            {...props}
            icon="account"
            color="#fff"
            style={{backgroundColor: '#0E6655'}}
          />
        )}
      />
      <Card.Content style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: `${BASE_PROFILE_IMAGE}${userData.user_Image}`,
            }}
            style={{height: 100, width: 100}}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 22}}>{userData.name}</Text>
          <Text style={{fontSize: 16}}>{userData.classification}</Text>
          <Text>{userData.email}</Text>
          <Button
            icon="logout"
            mode="outlined"
            onPress={logout}
            style={{marginTop: 3}}>
            ログアウト
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default UserInfo;
