import { View, StatusBar, RecyclerViewBackedScrollView } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';

import { Theme } from './src/theme';

import {AuthContext} from '@contexts/AuthContext';

import { Routes } from './src/routes';
import { SignUp } from '@screens/SignUp';
import { Home } from '@screens/Home';

export default function App() {

  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (

    <NativeBaseProvider theme={Theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthContext.Provider 
        value={{ 
          id: '1',
          name: 'Carlos',
          email: 'rike@gmail.com',
          avatar: 'rike.png'

          // user, 
          // singIn,
          // updateUserProfile,
          // signOut,
          // isLoadingUserStorageData,
          // refreshedToken
        }}
      >
        { fontsloaded ? <Routes/> : <Loading/>}
      </AuthContext.Provider>
            
    </NativeBaseProvider>
  );
}

