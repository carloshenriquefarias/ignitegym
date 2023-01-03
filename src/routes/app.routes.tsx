import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';

type AppRoutes = {
  home: undefined;
  exercise: {exerciseId: string}; //Definir assim para mostrar o exercicio certo
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{ 
      headerShown: false, // Remove o cabecalho de todas as tela
      tabBarShowLabel: false, // Remove o nome de todas os icones das tela
      tabBarActiveTintColor: colors.green[500], // Define a cor do icone selecionado das tela
      tabBarInactiveTintColor: colors.gray[200],

      tabBarStyle: { // Define a cor do fundo da parte de baixo das tela
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color,  }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null }} //Nao quer ter disponivel no menu
      />
    </Navigator>
  );
}