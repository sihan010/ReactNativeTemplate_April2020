import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import {getInternalAPI} from '../../../util/APIMethods';
import {AuthContext} from '../../context/AuthCntext';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import NoticeList from './NoticeList';

const Notice = props => {
  const {token, setNoticeCount} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getInitialData(page);
  }, []);

  useEffect(() => {
    let endpoint = `noticemanage/getnoticesbypage?page=1`;
    getInternalAPI(endpoint, token).then(data => {
      if (data) {
        setNoticeCount(data.unread);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [isFocused]);

  const getInitialData = async () => {
    let endpoint = `noticemanage/getnoticesbypage?page=${page}`;
    let data = await getInternalAPI(endpoint, token);
    if (data) {
      console.log(data);
      setNoticeData(data.data);
      setNoticeCount(data.unread);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const moreNoticePressed = async () => {
    setMoreLoading(true);
    setPage(page + 1);
    let endpoint = `noticemanage/getnoticesbypage?page=${page + 1}`;
    let data = await getInternalAPI(endpoint, token);
    if (data) {
      let newData = [...noticeData, ...data.data];
      setMoreLoading(false);
      setNoticeCount(data.unread);
      setNoticeData(newData);
      return;
    }
    setMoreLoading(false);
  };

  const markAsRead = i => {
    let d = noticeData;
    d[i].isRead = true;
    console.log(d);
    setNoticeData(d);
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
        ) : noticeData === null ? (
          <Text
            style={{
              alignSelf: 'center',
              color: 'red',
              fontSize: 20,
              marginVertical: 10,
            }}>
            No Notice Found !!
          </Text>
        ) : (
          <NoticeList
            data={noticeData}
            moreNoticePressed={moreNoticePressed}
            markAsRead={i => markAsRead(i)}
            moreLoading={moreLoading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notice;
