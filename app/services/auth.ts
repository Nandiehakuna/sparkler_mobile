//TODO: Change the caching implementation
const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

export default { getJwt };
