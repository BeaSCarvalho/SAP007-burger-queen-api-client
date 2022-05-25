import { token } from "./localStorage";
const urlOrders = 'https://lab-api-bq.herokuapp.com/orders';

export const createOrder = (order) => {
  return fetch(urlOrders, {
    method:'POST',
    headers: {'Content-type': "application/json",
      'Authorization': token()
    },
    body: JSON.stringify({
      client: order.client,
      table: order.table,
      products: order.products,
    })  
  })
  
}  

/*
.then((response) => response.json())
  .catch((error) => console.log(error, "Erro ao criar o pedido"));
*/
