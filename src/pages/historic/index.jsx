import { useState, useEffect } from "react";
import { getTime, getPreparationTime } from "../../components/Time/formatDate"
import { role } from "../../services/localStorage";
import { getAllOrders } from "../../services/orders";

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import { OrderCard, OrderProduct } from "../../components/OrderCard";
import Modal from "../../components/Modal";

import styles from "./historic.module.css"

function Historic(){

  const [orders, setOrders] = useState([]); 
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    async function historic() {
      try {
        let searchId = [...orders];
        const response = await getAllOrders();
        if(search === ""){
          searchId = response.sort((a,b) => {
            return b.id - a.id
          })
        } else {
          searchId = response.filter((order) => {
            return search == order.id;
          })
        }
        setOrders(searchId)
      } catch (error) {
        error
      }  
    }
    historic()  
  }, [orders])

  const roleKitchen = role() === "kitchen";

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
      <section className={styles.search}>
        <Input type='text' className="historic-input" placeholder="Pesquisar pedido por ID" onChange={(e) => setSearch(e.target.value)} value={search}/>
      </section> 
      <section className={styles.main}>
        {orders.map((item,index) => {
          const statusServed = item.status === "served"
          const statusReady = item.status === "ready" ||  item.status === "served"
          const infosProduct = item.Products.map((product) => {
            return (
              <div key={product.id}>
                <OrderProduct
                  name={product.name}
                  flavor={product.flavor}
                  complement={product.complement !== null ? product.complement : "nenhum"}
                  qtd={product.qtd}
                />
              </div>
            )
          });

          return (
            <div key={index}>
              <OrderCard
                status={item.status} 
                id={item.id}
                clientName={item.client_name}
                table={item.table}
                createdAt={getTime(item.createdAt)}
                processedAt={statusReady && getTime(item.processedAt)}
                preparedAt={statusReady && getPreparationTime(item.processedAt, item.createdAt)}
                updatedAt={statusServed && getPreparationTime(item.updatedAt, item.processedAt)}
                orderProducts={infosProduct}
                textButton={item.status}
              />
            </div>
          )  
        })}
      </section>
      {isModalVisible ? 
        <Modal className='modal active' onClose= {() => setIsModalVisible(false)}>Nenhum pedido com este ID</Modal> : null
      }      
    </div>
  )
}

export default Historic;