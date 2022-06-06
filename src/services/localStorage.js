export const setUserTokenAndRole = (role, token) => {
  localStorage.setItem("role", role)
  localStorage.setItem("token", token)    
}

export const logOut = (role, token) => {
  localStorage.removeItem("role", role);
  localStorage.removeItem("token", token);
} 

export const role = () => localStorage.getItem("role")
export const token = () => localStorage.getItem("token");
