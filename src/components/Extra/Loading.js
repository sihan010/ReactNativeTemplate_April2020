import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loading = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ActivityIndicator size={24} animating={true} color="#000" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
