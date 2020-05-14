import React, {useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, ActivityIndicator} from 'react-native-paper';
import {NO_IMAGE} from 'react-native-dotenv';

const ImageGallery = props => {
  const index = props.route.params.index;
  const galleryData = props.route.params.galleryData;
  return (
    <ImageViewer
      index={index}
      imageUrls={galleryData}
      enablePreload
      //saveToLocalByLongPress
      failImageSource={NO_IMAGE}
      loadingRender={() => {
        return <ActivityIndicator animating={true} color="#fff" size={24} />;
      }}
      renderArrowLeft={() => {
        return <Icon name="chevron-left" size={48} color="#fff" />;
      }}
      renderArrowRight={() => {
        return <Icon name="chevron-right" size={48} color="#fff" />;
      }}
      renderHeader={index => {
        //console.log(index, galleryData[index].alt);
        return (
          <Text
            style={{color: '#fff', alignSelf: 'center', paddingVertical: 5}}>
            {galleryData[index].alt}
          </Text>
        );
      }}
      renderIndicator={() => {
        return null;
      }}
    />
  );
};

export default ImageGallery;
