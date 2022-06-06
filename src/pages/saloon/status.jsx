import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus} from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { OrderCard, OrderProduct } from "../../components/OrderCard";
import Modal from "../../components/Modal";

import styles from "./status.module.css";


function Status(){
  
  const [orders, setOrders] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    getAllOrders()
    .then((data) => {
      const filteredOrders = data.filter((order) => {
        return order.status === "ready";
      })
      setOrders(filteredOrders);
      const modal = filteredOrders.length === 0
      setIsModalVisible(modal)
    })
    .catch((error) => error) 
  })  

  return (
    <div className={styles.container}>
      <Header />
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Pedidos Prontos'
        pathLinkThree='/historic' textPathThree='Histórico'
      />
      <section className={styles.main}>
        {orders.map((item,index) => {
          const statusReady = item.status === "ready"
          const infosProduct = item.Products.map((product) => {
            return (
              <OrderProduct
                key={product.id}
                name={product.name}
                flavor={product.flavor}
                complement={product.complement !== null ? product.complement : "nenhum"}
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
              processedAt={statusReady ? getTime(item.processedAt) : ""}
              preparedAt={statusReady ? getPreparationTime(item.processedAt, item.createdAt) : ""}
              orderProducts={infosProduct}
              textButton={item.status}
              updateToDeliveried={() => updateOrderStatus(item.id, "served")}
            />
          )  
        })}
      </section> 
      {isModalVisible ? 
        <Modal className='modal active' onClose= {() => setIsModalVisible(false)}>Nenhum pedido para ser entregue</Modal> : null
      } 
    </div>
  )
}

export default Status;