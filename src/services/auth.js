const urlUsers = "https://lab-api-bq.herokuapp.com/users";
const urlAuth = "https://lab-api-bq.herokuapp.com/auth";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlcmVudGUuYnFAZ21haWwuY29tIiwiaWQiOjQwMTcsImlhdCI6MTY1Mzk0NjAxNiwiZXhwIjoxNjg1NTAzNjE2fQ.sYzQ30TUB-r0xwA-lnKOY2PrnXKhFonze5KPJ4CNHlk

export const createUser =  (nameUser, emailUser, passwordUser, role) => {
  return fetch(urlUsers, {
    method:"POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
      role: role,
      restaurant: "BurgerQueenBea"
    })
  })
};

export const userLogin = async (emailUser, passwordUser) => {
  return await fetch(urlAuth, {
    method:"POST",
    headers: {"Content-type": "application/json"},
    body:JSON.stringify({
      email: emailUser,
      password: passwordUser,
    })
  })
  .then(response => response.json()) 
  .catch(error => error);
}

