import { useState, useEffect } from 'react';
import { getAllOrders } from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"
import { role } from "../../services/localStorage";

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import OrderCard from "../../components/OrderCard";
import OrderProduct from "../../components/OrderProduct"

function Historic(){
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    getAllOrders()
    .then((data) => {
      setOrders(data.sort((a,b) => {
        return b.id - a.id
      }))
    })
    .catch((error) => console.log(error))   
  })

  const roleKitchen = role() === 'kitchen';

  return (
    <div className='saloon-container'>
      <Header title="Atendimento"/>
      {roleKitchen ?
        <Nav pathLinkOne='/kitchen' textPathOne='A Preparar' pathLinkTwo='/historic' textPathTwo='Histórico' />
      :
        <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
          pathLinkThree='/historic' textPathThree='Histórico'
        />
      }  
      <section>
        {orders.map((item,index) => {
          const statusServed = item.status === 'served'
          const statusReady = item.status === 'ready' ||  item.status === 'served'
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
              processedAt={statusReady ? getTime(item.processedAt): ''}
              preparedAt={statusReady ? getPreparationTime(item.processedAt, item.createdAt): ''}
              updatedAt={statusServed ? getPreparationTime(item.updatedAt, item.processedAt) : ''}
              orderProducts={infosProduct}
              textButton={item.status}
            />
          )  
        })}
      </section>    
    </div>
  )
}

export default Historic;

/*const [orders, setOrders] = useState([]); 

  useEffect(() => {
    getAllOrders()
    .then((data) => {
      setOrders(data.filter((order) => {
        return order.status === "served" 
      }))
    })
    .catch((error) => console.log(error))   
  })

  return (
    <div>
      <Header>Atendimento</Header>
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
       pathLinkThree='/historic' textPathThree='Histórico'/>
       <section>
        {orders.map((item,index) => {
          const statusServed = item.status === 'served'
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
              processedAt={getTime(item.processedAt)}
              preparedAt={getPreparationTime(item.processedAt, item.createdAt)}
              updatedAt={statusServed ? getPreparationTime(item.updatedAt, item.processedAt) : ''}
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

export default Status;*/