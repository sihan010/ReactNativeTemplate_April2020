import 'react-native-gesture-handler';

import AuthContextProvider from './src/context/AuthCntext';
import React from 'react';
import RouteTogglerByAuth from './src/routes/RouteTogglerByAuth';
import ThemeWrapper from './src/theme/Wrapper';

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeWrapper>
        <RouteTogglerByAuth />
      </ThemeWrapper>
    </AuthContextProvider>
  );
};

export default App;
