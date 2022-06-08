export const setUserTokenAndRole = (role, token) => {
  localStorage.setItem("role", role)
  localStorage.setItem("token", token)    
}

export const logOut = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
} 

export const role = () => localStorage.getItem("role")
export const token = () => localStorage.getItem("token");
