import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Text, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from './UserPhoto';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

import { useAuth } from '@hooks/useAuth';

export function HomeHeader() {

    const {user, signOut} = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">

        <UserPhoto 
            source={user.avatar ? {uri: user.avatar} : defaultUserPhotoImg } 
            // { uri: 'https://github.com/JRSparrowII.png' }
            size={16}
            alt="Imagem do usuário"
            mr={4}
        />
      
        <VStack flex={1}> 
            
            <Text color="gray.100" fontSize="md">
                Bem-vindo,
            </Text>

            <Heading color="gray.100" fontSize="md" fontFamily="heading">
                {user.name}
            </Heading>

        </VStack>

        <TouchableOpacity onPress={signOut}> 
            <Icon  
                as={MaterialIcons}   // No Icone passa a biblioteca e as propriedades
                name="logout" 
                color="gray.200"
                size={7}
            />
        </TouchableOpacity>

    </HStack>
  );
}