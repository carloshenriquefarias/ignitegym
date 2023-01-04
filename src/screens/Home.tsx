import { useState, useEffect, useCallback} from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, Text, VStack, useToast } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { Loading } from '@components/Loading';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { AppError } from '@utils/AppError';
import { api } from '@services/api';

import { ExerciseDTO } from '@dtos/ExerciseDTO';

export function Home() {

  const [groups, setGroups] = useState<string[]>([]);  
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) { //Pegando o exercicio pelo ID
    navigation.navigate('exercise', {exerciseId});
  }  

  async function fetchGroups() { //Grupos de exercicios: ['Costas', 'Bíceps', 'Tríceps', 'ombro']
    try {
      const response = await api.get('/groups'); //Ver os grupos na flat list
      setGroups(response.data);
      // console.log(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fecthExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }  

  useEffect(() => {
    fetchGroups();
  },[])

  useFocusEffect(
    useCallback(() => {
      fecthExercisesByGroup()
    },[groupSelected]) //Escolher o grupo selecionado na flat list e recarregar a pagina
  ) 

  return (    

    <VStack flex={1}>

        <HomeHeader />

        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Group 
              name={item}
              isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
              onPress={() => setGroupSelected(item)} //Mudando o grupo quando for clicado
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
          px: 8,
          }}
          my={10}
          maxH={10} //Tamanho da FlatList em altura
          minH={10}
        />

        { isLoading ? <Loading/> :
          <VStack px={8}>

            <HStack justifyContent="space-between" mb={5}>

              <Heading color="gray.200" fontSize="md" fontFamily="heading">
                Exercícios
              </Heading>

              <Text color="gray.200" fontSize="sm">              
                {exercises.length}
              </Text>
            
            </HStack>

            <FlatList 
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard 
                  onPress={() => handleOpenExerciseDetails(item.id)} 
                  data={item} 
                />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{
                  paddingBottom: 20
              }}
            />

          </VStack>
        }

    </VStack>
  );
}