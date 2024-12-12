import { authTokenKey } from "../api/client";
import { User } from "../contexts/UsersContext";
import authStorage from "../auth/storage";
import service from "../api/users";

export default () => {
  async function quickAuth(
    googleUser:
      | { displayName: string; email: string; photoURL: string }
      | null
      | undefined
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

  return { quickAuth };
};
