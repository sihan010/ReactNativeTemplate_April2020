import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';

const Weather = props => {
  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="天気"
        subtitle="Weather"
        left={props => <Avatar.Icon {...props} icon="weather-windy-variant" />}
      />
      <Card.Content style={{flexDirection: 'row'}}>
        <View style={styles.container}>
          <Text>Tokyo</Text>
        </View>
        <View style={styles.container}>
          <Text>Windy</Text>
        </View>
        <View style={styles.container}>
          <Text>9 Degree</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Weather;
