import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus} from "../../services/orders";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"


import Header from "../../components/Header";
import { OrderCard, OrderProduct } from "../../components/OrderCard";
import Nav from '../../components/Nav';
import Modal from '../../components/Modal';

import styles from './kitchen.module.css';

function Kitchen(){

  const [orders, setOrders] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getAllOrders()
    .then((data) => {
      const filteredOrders = data.filter((order) => {
      const kitchenOrders = order.status === 'pending' || order.status === 'processing'
        return kitchenOrders
      })
      setOrders(filteredOrders);
      const modal = filteredOrders.length === 0;
      setIsModalVisible(modal);
    })
    .catch((error) => error)   
  })

  return (
    <div className={styles.container}>
      <Header />
      <Nav pathLinkOne='/kitchen' textPathOne='A Preparar' pathLinkTwo='/historic' textPathTwo='Histórico' />
      <section className={styles.main}>
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
      {isModalVisible ? 
        <Modal className='modal active' onClose= {() => setIsModalVisible(false)}>Nenhum pedido para ser preparado</Modal> : null
      }  
    </div>
  )
}

export default Kitchen;