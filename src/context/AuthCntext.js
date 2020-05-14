import React, {createContext, useState} from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fullData, setFullData] = useState(null);

  //Temporary. Make different Context for Notice Management
  const [unreadNotice, setUnreadNotice] = useState(0);

  const tokenAndDataSetter = token => {
    if (token) {
      setToken(token);
      let decoded = jwt_decode(token);
      setFullData(decoded);
      setUserData(JSON.parse(decoded.actort));
    }
    if (token === null) {
      setToken(null);
    }
  };

  const setNoticeCount = c => {
    console.log('from context', c);
    setUnreadNotice(c);
  };

  return (
    <AuthContext.Provider
      value={{
        //Values
        token,
        userData,
        isAuthorized,
        isVerified,
        unreadNotice,
        //Methods
        setToken: tokenAndDataSetter,
        setIsAuthorized,
        setIsVerified,
        setNoticeCount,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
