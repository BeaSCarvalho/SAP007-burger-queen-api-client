const urlUsers = 'https://lab-api-bq.herokuapp.com/users';
const urlAuth = 'https://lab-api-bq.herokuapp.com/auth';

export const createUser = (nameUser, emailUser, passwordUser, role) => {
  return fetch(urlUsers, {
    method:'POST',
    headers: {'Content-type': "application/json"},
    body: JSON.stringify({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
      role: role,
      restaurant: 'BurgerQueen'
    })
  })
};

export const userLogin = (emailUser, passwordUser) => {
  return fetch(urlAuth, {
    method:'POST',
    headers: {"Content-type": "application/json"},
    body:JSON.stringify({
      email: emailUser,
      password: passwordUser,
    })
  })  
}

/*fetch(url, {
  method:'POST',
  body:JSON.stringify()
  headers: {"Content-type": "application/json;charset=UTF-8"}
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Erro de solicitação', err));*/