import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
    getItem: async function (key: string) {
        try {
            let item = await AsyncStorage.getItem(key);
            //@ts-ignore
            return JSON.parse(item);
        } catch (error) {
            return null;
        }
    },
    setItem: async function (key: string, value: any) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
        }
    },
    removeItem: async function (key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
        }
    }
}

export default Storage