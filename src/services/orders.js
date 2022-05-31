import { token } from "./localStorage";
const urlOrders = 'https://lab-api-bq.herokuapp.com/orders';

export const createOrder = async (order) => {
  return await fetch(urlOrders, {
    method:'POST',
    headers: {'Content-type': "application/json",
      'Authorization': token()
    },
    body: JSON.stringify({
      client: order.client,
      table: order.table,
      products: order.products,
    })  
  }).then((response) => response.json())
}  

export const getAllOrders = async () => {
  return await fetch(urlOrders, {
    method:'GET',
    headers: {'Content-type': "application/json",
      'Authorization': token()
    }
  }).then((response) => response.json())
}   

export const updateOrderStatus = async (orderId, status) => {
  return await fetch(`${urlOrders}/${orderId}`, {
    method:'PUT',
    headers: {'Content-type': "application/json",
    'Authorization': token()
    },
    body: JSON.stringify({
      status:status
    })
  }).then((response) => response.json())
}

/*
.then((response) => response.json())
  .catch((error) => console.log(error, "Erro ao criar o pedido"));
*/
