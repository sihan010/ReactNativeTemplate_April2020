import {BASE_URI} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

const getInternalAPI = async (endpoint, token) => {
  let cookieStore = await AsyncStorage.getItem('@teramoto_cookie');
  let cookie = JSON.parse(cookieStore);
  let options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `bearer ${token}`,
      Cookie: cookie,
    }),
    accept: 'application/json',
  };
  let uri = `${BASE_URI}/${endpoint}`;
  return fetch(uri, options)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        //handle unauthorized
      } else {
        //handle other errors
      }
    })
    .then(data => {
      return data;
    });
};

const postInternalAPI = async (endpoint, token, body) => {
  let cookieStore = await AsyncStorage.getItem('@teramoto_cookie');
  let cookie = JSON.parse(cookieStore);
  let uri = `${BASE_URI}/${endpoint}`;
  const requestBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
      Cookie: cookie,
    },
    accept: 'application/json',
    body: body,
  };
  //console.log(uri, requestBody);
  return fetch(uri, requestBody)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        //handle unauthorized
      } else {
        //handle other errors
      }
    })
    .then(data => {
      return data;
    });
};

const postInternalAPIUpload = async (endpoint, token, body) => {
  let cookieStore = await AsyncStorage.getItem('@teramoto_cookie');
  let cookie = JSON.parse(cookieStore);
  let uri = `${BASE_URI}/${endpoint}`;
  const requestBody = {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      Cookie: cookie,
    },
    accept: 'application/json',
    body: body,
  };
  return fetch(uri, requestBody)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        //handle unauthorized
      } else {
        //handle other errors
      }
    })
    .then(data => {
      //console.log(data);
      return data;
    });
};

export {getInternalAPI, postInternalAPI, postInternalAPIUpload};
