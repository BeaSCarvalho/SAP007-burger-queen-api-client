import { useState, useEffect } from 'react';
import { getAllOrders } from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"
import { role } from "../../services/localStorage";

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { OrderCard, OrderProduct } from "../../components/OrderCard";

import styles from './historic.module.css'

function Historic(){
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    getAllOrders()
    .then((data) => {
      setOrders(data.sort((a,b) => {
        return b.id - a.id
      }))
    })
    .catch((error) => error)   
  })

  const roleKitchen = role() === 'kitchen';

  return (
    <div className={styles.container}>
      <Header title="Atendimento"/>
      {roleKitchen ?
        <Nav pathLinkOne='/kitchen' textPathOne='A Preparar' pathLinkTwo='/historic' textPathTwo='Histórico' />
      :
        <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Pedidos Prontos'
          pathLinkThree='/historic' textPathThree='Histórico'
        />
      }  
      <section className={styles.main}>
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