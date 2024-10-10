import * as SecureStore from 'expo-secure-store';

export const setSecuredItem = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecuredItem = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const deleteSecuredItem = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};

export const setItem = (key: string, value: string): void => {
  SecureStore.setItem(key, value);
}

export const getItem = (key: string): string | null => {
  return SecureStore.getItem(key);
}