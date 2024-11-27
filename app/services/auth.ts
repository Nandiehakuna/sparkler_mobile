import { jwtDecode } from "jwt-decode";

//TODO: Change the caching implementation
const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const decode = (jwt: string) => jwtDecode(jwt);

export default { decode, getJwt };
