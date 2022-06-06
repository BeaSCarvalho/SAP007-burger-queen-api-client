import { token } from "./localStorage";
const urlProducts = "https://lab-api-bq.herokuapp.com/products";

export const getAllProducts = async () => {
  return await fetch(urlProducts, {
    method:"GET",
    headers: {"Content-type": "application/json",
      "Authorization": token()
    },
  }).then(response => response.json()) 
  .catch((error) => error);
}