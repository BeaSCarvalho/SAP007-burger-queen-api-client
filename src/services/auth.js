const url = 'https://lab-api-bq.herokuapp.com/users';

export const createUser = async (nameUser, emailUser, passwordUser, role) => {
  return await fetch(url, {
    method:'POST',
    headers: {"Content-type": "application/json", "accept": "application/json"},
    body:JSON.stringify({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
      role: role,
      restaurant: 'BurgerQueen'
    })
  })
};

/*fetch(url, {
  method:'POST',
  body:JSON.stringify()
  headers: {"Content-type": "application/json;charset=UTF-8"}
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Erro de solicitação', err));*/