import { token } from "./localStorage";
const urlProducts = 'https://lab-api-bq.herokuapp.com/products';

export const getAllProducts = () => {
  return fetch(urlProducts, {
    method:'GET',
    headers: {'Content-type': "application/json",
      'Authorization': token()
    },
  })
}