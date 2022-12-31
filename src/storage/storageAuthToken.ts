import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE } from '@storage/storageConfig';

export async function storageAuthTokenSave(token: string) { //Armazenar
  await AsyncStorage.setItem(AUTH_STORAGE, token);
}

export async function storageAuthTokenGet() { //Pegar
  const token = await AsyncStorage.getItem(AUTH_STORAGE);

  return token;
}

export async function storageAuthTokenRemove() { //Remover
  await AsyncStorage.removeItem(AUTH_STORAGE);
}