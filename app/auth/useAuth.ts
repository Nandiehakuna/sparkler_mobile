import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  User as GoogleUser,
} from "firebase/auth";

import { authTokenKey } from "../services/client";
import { googleAuth } from "../storage/config";
import { User } from "../contexts/UsersContext";
import authStorage from "../auth/storage";
import service from "../services/users";

export default () => {
  async function quickAuth(
    googleUser: GoogleUser | null | undefined
  ): Promise<void | User | null> {
    if (!googleUser) return;
    const { displayName: name, email, photoURL: profileImage } = googleUser;
    if (!email || !name || !profileImage) return;
    const res = await service.quickAuth({ email, name, profileImage });
    if (!res) return;

    const authToken = res.headers[authTokenKey];

    if (authToken) authStorage.storeToken(authToken);
    return await authStorage.getUser();
  }

  const logIn = async (): Promise<void | User | null> => {
    try {
      const { user } = await signInWithPopup(
        googleAuth,
        new GoogleAuthProvider()
      );

      return await quickAuth(user);
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(googleAuth);
    } catch (error) {
      console.error("Sign-Out Error: ", error);
    }
  };

  return { logIn, logOut };
};
