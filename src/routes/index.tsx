import { useTheme, Box } from 'native-base';
import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import {useAuth} from '@hooks/useAuth';
import { Loading } from '@components/Loading';

export function Routes() {

  const {colors} = useTheme(); //Usando UseTheme podemos mudar a cor de fundo das telas
  const {user, isLoadingUserStorageData} = useAuth(); //Criação dos contextos do app 

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if(isLoadingUserStorageData){
    return <Loading/>;
  }

  return (
     //Usando a BOX por volta da tela evita fundos brancos na passagem de uma tela a outra
    <Box flex={1} bg="gray.700"> 
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes/> : <AuthRoutes/>}
        {/* <AppRoutes/> */}
      </NavigationContainer>
    </Box>
  );
}