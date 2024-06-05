import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

export default () => {
  return (
    // aqui quer dizer que os dados do usuário serão acessíveis em qualquer lugar
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};
