import { token } from "./localStorage";
const urlProducts = "https://lab-api-bq.herokuapp.com/products";

export const getAllProducts = async () => {
  try {
    const response = await fetch(urlProducts, {
      method:"GET",
      headers: {"Content-type": "application/json",
        "Authorization": token()
      }
    })
    return response.json() 
  } catch (error) {
    return error
  }
}