import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products";
import { createOrder } from "../../services/orders";

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Product from "../../components/Product";
import ItemOrderList from "../../components/ItemOrderList";
import Modal from "../../components/Modal";

import styles from "./saloon.module.css";

function Saloon(){

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [buttonsFlavors, setButtonsFlavors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("breakfast");

  const [infosClient, setInfosClient] = useState({
    name: "",
    table: "",
  })

  useEffect (() => {
    async function breakfast(){
      try {
        const response = await getAllProducts();
        setFilteredProducts(response.filter((item) => {
          return item.type === "breakfast";
        }));
      } catch (error) {
        return error;
      }
    }
    breakfast();
  }, [])

  const handleChange = (e) => {
    setInfosClient({
      ...infosClient,
      [e.target.id]: e.target.value
    })
  }

  async function handleMenu(category) {
    try {
      const response = await getAllProducts();
      setButtonsFlavors(false)
      setSelectedColor(category)
      setFilteredProducts(response.filter((item) => {
        return item.type === category || item.sub_type === category
      }));
    } catch (error) {
        return error
    }
  }

  function handleFlavor(e){
    setButtonsFlavors(true)
    setSelectedColor(e.target.value)
  }

  async function filterPerFlavor(flavor) {
    try {
      const response = await getAllProducts();
      setSelectedColor(flavor)
      setFilteredProducts(response.filter((item) => {
        return item.flavor === flavor 
      }));
    } catch (error) {
      return error
    }
  }

  function addItemToOrder(item){
    const productOnOrder = orderList.find((element) => {
      return element.id === item.id
    });

    if(productOnOrder) {
      productOnOrder.qtd += 1;
    } else {
        const newItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          flavor: item.flavor,
          complement: item.complement,
          qtd: 1,
        };   
      orderList.push(newItem)  
    }; 
    setOrderList([...orderList]);
  }

  function removeItemOfOrder(item){
    let newOrders = [...orderList];
    const productOnOrder = newOrders.find((element) => {
      return element.id === item.id
    })
    
    if(productOnOrder.qtd > 1) {
      productOnOrder.qtd -= 1;
    } else {
      newOrders = newOrders.filter((orderItem) => orderItem.id !== item.id)
    }
    setOrderList(newOrders)
  }

  function sum() {
    const total = []
    for (let i = 0; i < orderList.length; ++i){
      const totalEachProduct = orderList[i].qtd * orderList[i].price
      total.push(totalEachProduct)
    }
    
    const initialValue = 0
    const sumWithInitial = total.reduce((previousValue, currentValue) => 
        previousValue + currentValue, initialValue
      )
    return new Intl.NumberFormat("br-BR", {style: "currency", currency:"BRL"}).format(sumWithInitial);
  }

  async function handleSubmit() {
    const orderData = {
      client: infosClient.name,
      table: infosClient.table,
      products: orderList.map((item) => {
        const infosProduct = {
          id: item.id,
          name: item.name,
          price: item.price,
          flavor: item.flavor,
          complement: item.complement,
          qtd: item.qtd,
        };
        return infosProduct
      }),
    };

    if(infosClient.name === "" || infosClient.table === ""){
      setIsModalVisible(true)
      setErrorMessage("Preencha todos os campos")
    } else if(orderList.length === 0) {
      setIsModalVisible(true)
      setErrorMessage("Adicione produtos ao pedido")
    }else{
      setIsModalVisible(true)
      setErrorMessage("Pedidos finalizado com sucesso!")
      try {
        await createOrder(orderData)
        setOrderList([]);
      } catch (error) {
        setIsModalVisible(true)
        setErrorMessage(error)
      }
    }
    setInfosClient({
      name: "",
      table: ""
    })
  }
  
  return (
    <div className={styles.container}>
      <Header />
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Pedidos Prontos'
        pathLinkThree='/historic' textPathThree='Histórico'
      />
      {isModalVisible && 
        <Modal className='modal active' 
          onClose= {() => setIsModalVisible(false)}>{errorMessage}
        </Modal>
      }
      <section className={styles.form}>
        <div className={styles.menu}>
          <Button className='saloon-menu' id='breakfast' text='Café da Manhã' onClick={() => handleMenu("breakfast")} 
            style={{backgroundColor: selectedColor === "breakfast" ? "#D92525" : "#A61212"}}
          />
          <Button className='saloon-menu' id='all-day' text='Lanches' onClick={handleFlavor} 
            style={{backgroundColor: selectedColor === "" ? "#D92525" : "#A61212"}}
          />
          <Button className='saloon-menu' id='all-day' text='Porções' onClick={() => handleMenu("side")}
            style={{backgroundColor: selectedColor === "side" ? "#D92525" : "#A61212"}}
          />
          <Button className='saloon-menu' id='all-day' text='Bebidas' onClick={() => handleMenu("drinks")}
            style={{backgroundColor: selectedColor === "drinks" ? "#D92525" : "#A61212"}}
          />
        </div>
        {buttonsFlavors && 
          <div className={styles.flavors}>
            <Button className='saloon-menu' text='Carne' onClick={() => filterPerFlavor("carne")}
              style={{backgroundColor: selectedColor === "carne" ? "#D92525" : "#A61212"}}
            />
            <Button className='saloon-menu' text='Frango' onClick={() => filterPerFlavor("frango")}
              style={{backgroundColor: selectedColor === "frango" ? "#D92525" : "#A61212"}}
            />
            <Button className='saloon-menu' text='Vegetariano' onClick={() => filterPerFlavor("vegetariano")}
              style={{backgroundColor: selectedColor === "vegetariano" ? "#D92525" : "#A61212"}}
            />
          </div>
        }    
      </section>
      <section className={styles.mainContainer}>
        <ul className={styles.main}>
          {filteredProducts.map((item) => {
            return (
              <div key={item.id}>
                <Product
                name={item.name}
                image={item.image} 
                flavor={item.flavor} 
                complement={item.complement !== null ? "Complemento: " + item.complement : "sem complemento"} 
                price={new Intl.NumberFormat("br-BR", {style: "currency", currency:"BRL"}).format(item.price)}
                onClick={() => addItemToOrder(item)}
                />
              </div>
            )
          })}
        </ul>
        <section className={styles.order}>
          <h1 className={styles.title}>Pedido</h1>
          <Input type='text' placeholder='Cliente' className='saloon-input' onChange={handleChange} id='name' value={infosClient.name}/>
          <Input type='number' placeholder='Número da mesa' className='saloon-input' onChange={handleChange} id='table' value={infosClient.table}/>
          <ul className={styles.ul}>
            {orderList.map((item) =>{
              const checkFlavor = item.flavor === null;
              return (
                <div key={item.id}>
                  <ItemOrderList 
                    name={checkFlavor ? item.name : item.name + " - " + item.flavor}
                    qtd={item.qtd}
                    price={item.qtd * item.price}
                    complement = {item.complement !== null ? item.complement : "s/c."}
                    removeItem={() => removeItemOfOrder(item)}
                    addItem={() => addItemToOrder(item)}
                  />
                </div>
              )  
            })}
          </ul>  
          <p className={styles.totalOrderBottom}>Total: {sum()}</p>
          <div className={styles.containerBtn}>
            <Button className='saloon-finalize-order' text='Finalizar Pedido' onClick={handleSubmit}/>
          </div>  
        </section>     
      </section>
    </div>
  )
}

export default Saloon;