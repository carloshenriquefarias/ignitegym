import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {

  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (

    <View style={{flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: '#202024'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsloaded ? <Text> E la vamos nos!</Text> : <View/> }      
    </View>
  );
}

