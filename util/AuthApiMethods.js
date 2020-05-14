import {BASE_URI} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

const set_cookies = async headers => {
  const set_cookies = [];
  for (const [name, value] of headers) {
    //console.log(name);
    if (name === 'set-cookie') {
      set_cookies.push(value);
    }
  }
  if (set_cookies.length > 0) {
    await AsyncStorage.setItem(
      '@teramoto_cookie',
      JSON.stringify(set_cookies[0]),
    );
  }
};

const login = credentials => {
  let options = {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(credentials),
  };
  let uri = `${BASE_URI}/login/auth`;
  console.log(uri, options);
  return fetch(uri, options)
    .then(response => {
      if (response.status === 200) {
        set_cookies(response.headers); //Save authentication cookie
        return response.json();
      } else {
        return null;
      }
    })
    .then(data => {
      return data;
    });
};

const validate = async token => {
  let cookieStore = await AsyncStorage.getItem('@teramoto_cookie');
  let cookie = JSON.parse(cookieStore);
  //console.log('validate-->', cookie);
  let options = {
    method: 'post',
    headers: new Headers({
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      Cookie: cookie,
    }),
  };
  let uri = `${BASE_URI}/login/validate`;
  return fetch(uri, options)
    .then(response => {
      if (response.status === 200) {
        return new Promise(resolve => resolve({validated: true}));
      } else {
        return new Promise(resolve => resolve({validated: false}));
      }
    })
    .then(res => {
      //console.log('==>', res);
      return res.validated;
    });
};

export {login, validate};
