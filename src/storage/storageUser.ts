import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE } from '@storage/storageConfig';

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user)) //Armazena as informações
}

export async function storageUserGet() { //Pega as informações
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user
}

export async function storageUserRemove() { //Remove as informações
  await AsyncStorage.removeItem(USER_STORAGE);
}