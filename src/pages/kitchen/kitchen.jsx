import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus} from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"


import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";
import OrderProduct from "../../components/OrderProduct"
import Nav from '../../components/Nav';

import './kitchen.css';

function Kitchen(){

  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    getAllOrders()
    .then((response) => {
      setOrders(response.filter((orders) =>{
        return orders.status === 'pending' || orders.status === 'processing'
      }))
    })
    .catch((error) => console.log(error))   
  })

  return (
    <div className="kitchen-container">
      <Header />
      <Nav pathLinkOne='/kitchen' textPathOne='A Preparar' pathLinkTwo='/historic' textPathTwo='Histórico' />
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
              updateToProcessing={() => updateOrderStatus(item.id, 'processing')}
              updateToReady={() => updateOrderStatus(item.id, 'ready')}
            />
          )  
        })}
      </section>  
    </div>
  )
}

export default Kitchen;