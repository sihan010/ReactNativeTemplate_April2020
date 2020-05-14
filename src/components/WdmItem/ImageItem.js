import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {Surface, Text, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NO_IMAGE, BASE_IMAGE} from 'react-native-dotenv';

const ImageItem = props => {
  let imageSource =
    props.data.smallFileName === 'no-image.png'
      ? NO_IMAGE
      : `${BASE_IMAGE}${props.data.smallFileName}`;
  let clickable = props.data.smallFileName === 'no-image.png' ? false : true;

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      `Do you want to delete ${props.data.header}`,
      [
        {text: 'No', onPress: () => null, style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => props.deleteImage(props.data.boxNumber),
        },
      ],
      {cancelable: false},
    );
  };

  const uploadAllowedChecker = (box, type) => {
    if (clickable) {
      Alert.alert(
        'Message',
        `Delete existing image before uploading`,
        [{text: 'Ok', onPress: () => null, style: 'cancel'}],
        {cancelable: false},
      );
      return;
    }
    props.takeWdmItemImage(box, type);
  };

  return (
    <Surface style={{flex: 1, elevation: 3, marginVertical: 3}}>
      <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Text>{props.data.header}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Icon
            name="delete"
            size={24}
            onPress={clickable ? confirmDelete : null}
          />
          <Icon
            name="camera"
            size={24}
            onPress={() => uploadAllowedChecker(props.data.boxNumber, 'camera')}
          />
          <Icon
            name="image"
            size={24}
            onPress={() =>
              uploadAllowedChecker(props.data.boxNumber, 'gallery')
            }
          />
          <Icon
            name="cube-scan"
            size={24}
            onPress={
              clickable ? () => props.toggleGallery(props.data.gallery) : null
            }
          />
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={
            clickable ? () => props.toggleGallery(props.data.gallery) : null
          }>
          <Image
            source={{
              uri: imageSource,
            }}
            resizeMode="contain"
            style={{height: 200, width: 200}}
          />
        </TouchableOpacity>
      </View>
      {clickable ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Chip style={{backgroundColor: '#D0ECE7'}}>
            {props.data.width}px X {props.data.height}px
          </Chip>
          <Chip style={{backgroundColor: '#F6DDCC'}}>
            サイズ: {props.data.size}
          </Chip>
        </View>
      ) : (
        <Text style={{color: 'red', alignSelf: 'center', marginVertical: 5}}>
          画像が見つかりません
        </Text>
      )}
    </Surface>
  );
};

export default ImageItem;
