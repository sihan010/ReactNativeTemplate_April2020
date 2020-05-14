import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {Divider, Switch, Text} from 'react-native-paper';

const Setting = props => {
  const [english, setEnglish] = useState(true);
  const [dark, setDark] = useState(true);
  const [notification, setNotification] = useState(true);
  useEffect(() => {
    console.log(english, dark, notification);
  }, [english, dark, notification]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.row}>
          <View style={{flex: 2}}>
            <Text>English</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              color="#AF601A"
              value={english}
              onValueChange={() => setEnglish(!english)}
            />
          </View>
        </View>
        <Divider />
        <View style={styles.row}>
          <View style={{flex: 2}}>
            <Text>Dark Theme</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              color="#AF601A"
              value={dark}
              onValueChange={() => setDark(!dark)}
            />
          </View>
        </View>
        <Divider />
        <View style={styles.row}>
          <View style={{flex: 2}}>
            <Text>Push Notification</Text>
          </View>
          <View style={styles.switch}>
            <Switch
              color="#AF601A"
              value={notification}
              onValueChange={() => setNotification(!notification)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  switch: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Setting;
