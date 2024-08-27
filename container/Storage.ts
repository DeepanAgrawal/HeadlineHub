import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const storeData = (key, value) => {
  storage.set(key, JSON.stringify(value));
};

export const retrieveData = key => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};
