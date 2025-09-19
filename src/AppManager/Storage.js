import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static async save(k, v) {
    try {
      await AsyncStorage.setItem(k, String(v));
    } catch {}
  }

  static async get(k) {
    try {
      const out = await AsyncStorage.getItem(k);
      return out !== null ? out : null;
    } catch {
      return null;
    }
  }
}