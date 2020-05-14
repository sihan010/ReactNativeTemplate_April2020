import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const QRCodeReader = props => {
  let camera = useRef();

  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        exif: true,
        writeExif: true,
        doNotSave: false,
        fixOrientation: true,
        forceUpOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      console.log(data);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        autoFocus="on"
        autoFocusPointOfInterest={afOrdinates}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        //flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          //console.log(barcodes);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default QRCodeReader;
