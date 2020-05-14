import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import {getInternalAPI} from '../../../util/APIMethods';
import {AuthContext} from '../../context/AuthCntext';
import {ActivityIndicator, Text} from 'react-native-paper';
import UserInfo from './UserInfo';

const Profile = props => {
  const {token} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let endpoint = 'UserProfile/getProfileInfo';
    try {
      let data = await getInternalAPI(endpoint, token);
      //console.log(data);
      if (data) {
        setUserData(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      //setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getInitialData} />
        }>
        {loading ? (
          <ActivityIndicator
            color="#2980B9"
            animating={true}
            style={{paddingVertical: 5}}
          />
        ) : userData === null ? (
          <Text
            style={{
              alignSelf: 'center',
              color: 'red',
              fontSize: 20,
              marginVertical: 10,
            }}>
            No Profile Found !!
          </Text>
        ) : (
          <UserInfo data={userData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
