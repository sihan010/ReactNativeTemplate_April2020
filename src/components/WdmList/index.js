import React, {useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import Weather from './Weather';
import WdmList from './WdmList';

const Home = props => {
  const [loading, setLoading] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    wait(100).then(() => setLoading(false));
  }, [loading]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {/* <Weather /> */}
        <WdmList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
