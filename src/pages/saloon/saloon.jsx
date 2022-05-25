import { useState } from 'react';
import { getAllProducts } from '../../services/products';
import { createOrder } from '../../services/orders';
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Product from "../../components/Product";
import ItemOrderList from '../../components/ItemOrderList';
import Modal from '../../components/Modal';

import './saloon.css';

function Saloon(){
  const navigate = useNavigate();


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [userComplement, setUserComplement] = useState([])

  const [infosClient, setInfosClient] = useState({
    name: '',
    table: '',
  })

  const handleChange = (e) => {
    setInfosClient({
      ...infosClient,
      [e.target.id]: e.target.value
    })
  }

  function handleMenu(category) {
    getAllProducts()
    .then((response) => response.json())
    .then((data) =>{
      setFilteredProducts(data.filter((item) => {
        return item.type === category}
      ));
    })
    .catch((error) => console.log(error))
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
          addComplement: "no",
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

    for (let i= 0; i < orderList.length; ++i){
      const totalEachProduct = orderList[i].qtd * orderList[i].price
      total.push(totalEachProduct)
    }
    const initialValue = 0
    const sumWithInitial = total.reduce((previousValue, currentValue) => 
        previousValue + currentValue, initialValue
      )
    return sumWithInitial
  }

  function addComplement(item) {
    const productOnOrder = orderList.find((element) => {
      return element.id === item.id
    });

    productOnOrder.addComplement = 'yes';
    productOnOrder.price += 1;
    console.log(orderList)
    
    setUserComplement([... userComplement, item.complement]) 
  }

  console.log(orderList)

  function handleSubmit() {
    const orderData = {
      client: infosClient.name,
      table: infosClient.table,
      products: orderList.map((item) => {
        const infosProduct = {
          id: item.id,
          name: item.name,
          price: item.price,
          flavor: item.flavor,
          addComplement: item.addComplement,
          complement: item.complement,
          qtd: item.qtd,
        };
        return infosProduct
      }),
    };

    if(infosClient.name === '' || infosClient.table === ''){
      setIsModalVisible(true)
      setErrorMessage("Preencha todos os campos")
    } else if(orderList.length === 0) {
      setIsModalVisible(true)
      setErrorMessage("Adicione produtos ao pedido")
    }else{
      createOrder(orderData)
      .then((response) =>{
        response.json()
        navigate('../status')
      })
      .catch((error) => {
        console.log(error)
      })
    }  
  }

  return (
    <div className='saloon-container'>
      <Header title="Atendimento"/>
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
        pathLinkThree='/historic' textPathThree='Histórico'/>
      <section className='saloon-form'>
        <div className="initial-infos">
          <Input type='text' placeholder='Cliente' className='saloon-input' onChange={handleChange} id='name' value={infosClient.name}/>
          <Input type='number' placeholder='Número da mesa' className='saloon-input' onChange={handleChange} id='table' value={infosClient.table}/>
          <p>Total: R${sum()},00</p>
        </div> 
        <div className="select-menu">
          <Button className='saloon-menu' id='breakfast' text='Café da Manhã' onClick={() => handleMenu('breakfast')}/>
          <Button className='saloon-menu' id='all-day' text='Refeição' onClick={() => handleMenu('all-day')} />
        </div>   
      </section>
      <ul className="saloon-main">
        {filteredProducts.map((item) => {
          return (
            <Product
              key={item.id}
              name={item.name}
              image={item.image} 
              flavor={item.flavor} 
              complement={item.complement} 
              price={item.price}
              onClick={() => addItemToOrder(item)}
              onClickAdd={() => addComplement(item)} 
            />
          )
        })}
      </ul>
      <section>
        <h1>Pedido</h1>
        <p>Cliente: {infosClient.name}</p>
        <p>Mesa: {infosClient.table}</p>
        {orderList.map((item) =>{
          const checkFlavor = item.flavor === null;
          return (
            <ItemOrderList 
              key={item.id}
              name={checkFlavor ? item.name : item.name + ' - ' + item.flavor}
              qtd={item.qtd}
              price={item.qtd * item.price}
              complement = {userComplement}
              removeItem={() => removeItemOfOrder(item)}
              addItem={() => addItemToOrder(item)}
            />
          )  
        })}
        <p>Total: R${sum()},00</p>
        <Button text='Finalizar Pedido' onClick={handleSubmit}/>
        {isModalVisible ? 
          <Modal className='modal active' 
            onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null}
       
      </section>
    </div>
  )
}

export default Saloon;