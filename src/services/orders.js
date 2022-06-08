import { token } from "./localStorage";
const urlOrders = "https://lab-api-bq.herokuapp.com/orders";

export const createOrder = async (order) => {
  try {
    const response = await fetch(urlOrders, {
      method:"POST",
      headers: {"Content-type": "application/json",
        "Authorization": token()
      },
      body: JSON.stringify({
        client: order.client,
        table: order.table,
        products: order.products,
      })  
    })
    return response.json() 
  } catch (error) {
    return error
  }
}

export const getAllOrders = async () => {
  try {
    const response = await fetch(urlOrders, {
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

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${urlOrders}/${orderId}`, {
      method:"PUT",
      headers: {"Content-type": "application/json",
      "Authorization": token()
      },
      body: JSON.stringify({
        status:status
      })
    })  
    return response.json() 
  } catch (error) {
    return error
  }
}  

