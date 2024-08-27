import {MMKV} from 'react-native-mmkv';
import {Article} from './types';

const storage = new MMKV();

export const storeData = (key: string, value: Array<Article>) => {
  storage.set(key, JSON.stringify(value));
};

export const retrieveData = (key: string) => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};
