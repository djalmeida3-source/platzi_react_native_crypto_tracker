import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.log('Storage store err: ', err);
      return false;
    }
  }

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Storage get err: ', err);
      throw Error(err);
    }
  }

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys)
    } catch (error) {
      console.error('Storage multiGet err: ', err);
      throw Error(err);
    }
  }

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Storage gelAllKeys err: ', err);
      throw Error(err);
    }
  }

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Storage remove err: ', err);
    }
  }
}

export default Storage;
