import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Text, Card, Divider, Caption, Subheading} from 'react-native-paper';

const NoticeDetails = props => {
  const data = props.route.params.data;
  //console.log(data);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Card style={{flex: 1, margin: 10}}>
        <Subheading style={{paddingHorizontal: 10}}>{data.タイトル}</Subheading>
        <Caption style={{paddingHorizontal: 10}}>{data.カテゴリ}</Caption>
        <Divider />
        <Card.Content style={{flex: 1}}>
          <WebView
            source={{
              html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Notice</title>
              </head>
              <body>
                ${data.内容}
              </body>
              </html>`,
            }}
          />
        </Card.Content>
        <Divider />

        <Text style={{paddingHorizontal: 10}}>Posted: {data.登録日時}</Text>
        <Text style={{paddingHorizontal: 10}}>
          Posted By: {data.最終更新者}
        </Text>
      </Card>
    </SafeAreaView>
  );
};

export default NoticeDetails;
