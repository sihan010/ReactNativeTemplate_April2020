import React, {useState, useEffect, useContext} from 'react';
import {Card, Avatar, ActivityIndicator} from 'react-native-paper';
import {AuthContext} from '../../context/AuthCntext';
import {useNavigation} from '@react-navigation/native';
import {
  getInternalAPI,
  postInternalAPI,
  postInternalAPIUpload,
} from '../../../util/APIMethods';
import ImagePicker from 'react-native-image-crop-picker';
import ImageItem from './ImageItem';
import {BASE_IMAGE} from 'react-native-dotenv';

const ImageActions = props => {
  const id = props.id;
  const ckptn = props.wdmData.CKPTN;

  const navigation = useNavigation();

  const {token, userData} = useContext(AuthContext);
  const [wdmImageData, setWdmImageData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  //START Data Fetch and Processing
  const getInitialData = async () => {
    setLoading(true);
    let ckptnListEndPoint = `wdmdetails/getListOfCheckpoints?ckptn=${ckptn}`;
    let ckptnList = await getInternalAPI(ckptnListEndPoint, token);
    let headerList = [];
    Object.keys(ckptnList).forEach(c => {
      if (c.includes('GroupFlag') && ckptnList[c] === true) {
        let prefix = c.split('_')[0];
        let title = ckptnList[prefix + '_Title'];
        let serial = title.substr(0, 2);
        //Extract whatever possible
        let item = {
          serial: serial,
          title: title,
          imageFlag: ckptnList[prefix + '_ImageFlag'],
          groupFlag: ckptnList[c],
        };
        headerList.push(item);
      }
    });

    let endpoint = `wdmdetails/getWdmImages?id=${id}`;
    let data = await getInternalAPI(endpoint, token);
    if (data) {
      for (let i = 0; i < headerList.length; i++) {
        //Get which index of data should be modified from headerList's serial property
        let index = parseInt(headerList[i].serial) - 1;
        //insert extra information to data object
        data[index]['header'] = headerList[i].title;
        data[index]['boxNumber'] = headerList[i].serial;
        data[index]['imageFlag'] = headerList[i].imageFlag;
        data[index]['groupFlag'] = headerList[i].groupFlag;
        data[index]['kanriId'] = props.wdmData.管理ID;
        data[index]['itemId'] = id;
      }

      let sources = [];
      let galleryCounter = 0;
      for (let i = 0; i < data.length; i++) {
        //If there is an image (has image name) and imageFlag is allowed, create an object for gallery
        if (!(data[i].name === 'no-image.png') && data[i].imageFlag) {
          let src = `${BASE_IMAGE}${data[i].name}`;
          //let downloadUrl = `https://sol.kccs.co.jp/AspCoreReactJS/image/${data[i].originalFileName}`;
          let item = {
            url: src,
            width: parseInt(data[i].width),
            height: parseInt(data[i].height),
            alt: data[i].header, //already set header :)
          };
          sources.push(item);
          //add an property in data to distinguish between clickable image
          //If image is included in gallery, image will be clickable
          data[i]['gallery'] = galleryCounter;
          galleryCounter++;
        } else {
          data[i]['gallery'] = -1;
        }
      }
      //console.log(data, sources);
      setGalleryData(sources);
      clearData(data);
      return;
    }
    setLoading(false);
  };

  const clearData = fin => {
    let re = [];
    for (let i = 0; i < fin.length; i++) {
      if (fin[i].groupFlag) {
        re.push(fin[i]);
      }
    }
    setWdmImageData(re);
    setLoading(false);
  };

  //END Data Fetch and Processing

  const deleteImage = imageColumn => {
    let jsonData = {
      KeyId: id,
      管理ID: props.wdmData.管理ID,
      ImageColNumber: imageColumn,
      最終更新者: userData.userId,
    };

    let endpoint = `wdmdetails/deleteWDMImage`;
    postInternalAPI(endpoint, token, JSON.stringify(jsonData)).then(data => {
      if (data) {
        //console.log(data);
        getInitialData();
      }
    });
  };

  const uploadImage = async (imagePath, mime, jsonData) => {
    let photo = {uri: imagePath, type: mime, name: 'Teramto_Mobile.jpg'};
    let formData = new FormData();
    formData.append('uploadedImg', photo);
    formData.append('jsonData', JSON.stringify(jsonData));
    //console.log(formData);
    let endpoint = 'wdmdetails/uploadWDMImage';
    let data = await postInternalAPIUpload(endpoint, token, formData);
    //console.log(data);
    getInitialData();
  };

  const takeWdmItemImage = (imageColumn, type) => {
    let jsonData = {
      KeyId: id,
      管理ID: props.wdmData.管理ID,
      ImageColNumber: imageColumn,
      最終更新者: userData.userId,
    };
    if (type === 'camera') {
      ImagePicker.openCamera({
        cropping: false,
        includeExif: true,
      })
        .then(image => {
          uploadImage(image.path, image.mime, jsonData);
        })
        .catch(err => {});
    } else if (type === 'gallery') {
      ImagePicker.openPicker({
        cropping: false,
        includeExif: true,
      })
        .then(image => {
          console.log(image);
          uploadImage(image.path, image.mime, jsonData);
        })
        .catch(err => {
          console.log(err);
        });
    } else return;
  };

  const toggleGallery = index => {
    navigation.navigate('Gallery', {index, galleryData});
  };

  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="Images"
        subtitle="WDM Item Image Actions"
        left={props => (
          <Avatar.Icon
            {...props}
            icon="image-multiple"
            color="#fff"
            style={{backgroundColor: '#CD6155'}}
          />
        )}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          color="#CD6155"
          style={{paddingVertical: 5}}
        />
      ) : (
        <Card.Content>
          {wdmImageData.map((item, key) => {
            return (
              <ImageItem
                key={key}
                data={item}
                takeWdmItemImage={(box, type) => takeWdmItemImage(box, type)}
                deleteImage={box => deleteImage(box)}
                toggleGallery={i => toggleGallery(i)}
              />
            );
          })}
        </Card.Content>
      )}
    </Card>
  );
};

export default ImageActions;
