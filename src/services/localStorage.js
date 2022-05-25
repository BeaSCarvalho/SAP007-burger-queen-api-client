export const userToken = (token) => localStorage.setItem("userToken", token);
export const token = () => localStorage.getItem('userToken');

