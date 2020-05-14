import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import WdmInfo from './WdmInfo';
import ImageActions from './ImageActions';
import {AuthContext} from '../../context/AuthCntext';
import {getInternalAPI} from '../../../util/APIMethods';

const Home = props => {
  const id = props.route.params.id;
  const {token} = useContext(AuthContext);
  const [wdmData, setWdmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    let endpoint = `wdmdetails/getwdmdetails?id=${id}`;
    let data = await getInternalAPI(endpoint, token);
    if (data) {
      setWdmData(data[0]);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getInitialData} />
        }>
        {!loading ? (
          <>
            <WdmInfo wdmData={wdmData} />
            <ImageActions id={id} wdmData={wdmData} />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
