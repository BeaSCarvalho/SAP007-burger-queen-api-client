import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus} from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import OrderCard from "../../components/OrderCard";
import OrderProduct from "../../components/OrderProduct"


function Status(){
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    getAllOrders()
    .then((data) => {
      setOrders(data.filter((order) => {
        if(order.status === ''){
          return 'Nenhum pedido a ser entregue'
        } else {
          return order.status === "ready" 
        }
        
      })) 
    })
    .catch((error) => console.log(error))   
  })

  return (
    <div>
      <Header />
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
       pathLinkThree='/historic' textPathThree='Histórico'/>
       <section>
        {orders.map((item,index) => {
          const statusReady = item.status === 'ready'
          const infosProduct = item.Products.map((product) => {
            return (
              <OrderProduct
                key={product.id}
                name={product.name}
                flavor={product.flavor}
                complement={product.complement !== null ? product.complement : 'nenhum'}
                qtd={product.qtd}
              />
            )
          });

          return (
            <OrderCard
              key={index}
              status={item.status} 
              id={item.id}
              clientName={item.client_name}
              table={item.table}
              createdAt={getTime(item.createdAt)}
              processedAt={statusReady ? getTime(item.processedAt) : ''}
              preparedAt={statusReady ? getPreparationTime(item.processedAt, item.createdAt) : ''}
              orderProducts={infosProduct}
              textButton={item.status}
              updateToDeliveried={() => updateOrderStatus(item.id, 'served')}
            />
          )  
        })}
      </section>  
      <p></p>
    </div>
  )
}

export default Status;