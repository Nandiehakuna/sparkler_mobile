import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  User as GoogleUser,
} from "firebase/auth";

import { authTokenKey, processResponse } from "../services/client";
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
    console.log("Res", res);
    if (!res) return;

    const { ok, problem } = processResponse(res);
    if (!ok) return console.log("not ok", problem);

    const authToken = res.headers[authTokenKey];
    console.log("auth token", authToken);
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
