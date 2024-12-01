import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

import { User } from "../contexts/UsersContext";

const key = "authToken";
// TODO: in deploymeny (real mobile or emulator) restore the SecureStorage
const storeToken = async (authToken: string) => {
  try {
    // await SecureStore.setItemAsync(key, authToken);
    localStorage.setItem(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    // return await SecureStore.getItemAsync(key);
    return localStorage.getItem(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async (): Promise<User | null> => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
