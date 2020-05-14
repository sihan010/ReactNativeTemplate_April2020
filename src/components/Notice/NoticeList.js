import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Avatar,
  Card,
  TouchableRipple,
  Text,
  Divider,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {postInternalAPI} from '../../../util/APIMethods';
import {AuthContext} from '../../context/AuthCntext';

const NoticeList = props => {
  const noticeData = props.data;
  console.log('new==>', noticeData);
  const navigation = useNavigation();
  const {token, userData} = useContext(AuthContext);

  const noticePressed = param => {
    //setModalContent(noticeData[param][0]);
    navigation.navigate('NoticeDetails', {data: noticeData[param]});

    if (!noticeData[param].isRead) {
      let endpoint = 'noticemanage/noticealreadyread';
      const body = {
        userId: userData.userId,
        noticeId: noticeData[param].id,
      };
      //console.log(endpoint, body);
      postInternalAPI(endpoint, token, JSON.stringify(body));
    }
    props.markAsRead(param);
  };

  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="お知らせ"
        subtitle="Notice"
        left={props => (
          <Avatar.Icon
            {...props}
            icon="bell"
            color="#fff"
            style={{backgroundColor: '#2980B9'}}
          />
        )}
      />
      <Card.Content>
        {noticeData.map((item, key) => {
          return (
            <View key={key}>
              <View style={item.isRead ? styles.isRead : styles.notRead}>
                <View style={{flex: 1}}>
                  {item.isNew ? (
                    <Icon
                      name="new-box"
                      size={24}
                      color="red"
                      style={{padding: 5}}
                    />
                  ) : null}
                </View>
                <View
                  style={{
                    flex: 9,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => noticePressed(key)}>
                    <Text style={{paddingVertical: 5, marginHorizontal: 5}}>
                      {item.タイトル}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Divider />
            </View>
          );
        })}
      </Card.Content>
      <Card.Actions style={{justifyContent: 'center'}}>
        <Button
          loading={props.moreLoading}
          onPress={props.moreNoticePressed}
          icon="more"
          mode="outlined"
          uppercase={false}>
          もっと通知
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  isRead: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#E8F6F3',
    borderRadius: 5,
  },
  notRead: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#F4ECF7',
    borderRadius: 5,
  },
});

export default NoticeList;
