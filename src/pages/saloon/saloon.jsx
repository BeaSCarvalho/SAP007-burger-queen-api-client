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
  const [buttonsFlavors, setButtonsFlavors] = useState(false)

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
    .then((data) =>{
      setButtonsFlavors(false)
      setFilteredProducts(data.filter((item) => {
        return item.type === category || item.sub_type === category
      }));
    })
    .catch((error) => console.log(error))
  }
  function handleFlavor(){
    setButtonsFlavors(true)
  }

  function filterPerFlavor(flavor) {
    getAllProducts()
    .then((data) => {
      setFilteredProducts(data.filter((item) => {
        return item.flavor === flavor 
      }));
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
    return sumWithInitial
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
      .then(() =>{
          navigate('../status')  
      })
      .catch((error) => {
        console.log(error)
      })
    }  
  }

  return (
    <div className='saloon-container'>
      <Header />
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
        pathLinkThree='/historic' textPathThree='Histórico'
      />
      <section className='saloon-form'>
        <div className="initial-infos">
          <Input type='text' placeholder='Cliente' className='saloon-input' onChange={handleChange} id='name' value={infosClient.name}/>
          <Input type='number' placeholder='Número da mesa' className='saloon-input' onChange={handleChange} id='table' value={infosClient.table}/>
          <p className='total-order-top' >Total: R${sum()},00</p>
        </div> 
        <div className="select-menu">
          <Button className='saloon-menu' id='breakfast' text='Café da Manhã' onClick={() => handleMenu('breakfast')}/>
          <Button className='saloon-menu' id='all-day' text='Lanches' onClick={() => handleFlavor()} />
          <Button className='saloon-menu' id='all-day' text='Porções' onClick={() => handleMenu('side')} />
          <Button className='saloon-menu' id='all-day' text='Bebidas' onClick={() => handleMenu('drinks')} />
        </div>
        {buttonsFlavors ? 
          <div className="flavor-menu">
            <Button className='saloon-menu' text='Carne' onClick={() => filterPerFlavor('carne')}/>
            <Button className='saloon-menu' text='Frango' onClick={() => filterPerFlavor('frango')}/>
            <Button className='saloon-menu' text='Vegetariano' onClick={() => filterPerFlavor('vegetariano')}/>
          </div>
          :''}    
      </section>
      <section className='saloon-main-container'>
        <ul className="saloon-main">
          {filteredProducts.map((item) => {
            return (
              <Product
                key={item.id}
                name={item.name}
                image={item.image} 
                flavor={item.flavor} 
                complement={item.complement !== null ? 'Complemento: ' + item.complement : 'sem complemento'} 
                price={item.price}
                onClick={() => addItemToOrder(item)}
              />
            )
          })}
        </ul>
        <section className='order-saloon'>
          <h1 className='title-order'>Pedido</h1>
          <p className='client-name-saloon'>Cliente: {infosClient.name}</p>
          <p className='client-table-saloon'>Mesa: {infosClient.table}</p>
          <ul className='ul-orderList'>
            {orderList.map((item) =>{
              const checkFlavor = item.flavor === null;
              return (
                <ItemOrderList 
                  key={item.id}
                  name={checkFlavor ? item.name : item.name + ' - ' + item.flavor}
                  qtd={item.qtd}
                  price={item.qtd * item.price}
                  complement = {item.complement !== null ? item.complement : 's/c.'}
                  removeItem={() => removeItemOfOrder(item)}
                  addItem={() => addItemToOrder(item)}
                />
              )  
            })}
          </ul>  
          <p className='total-order-bottom'>Total: R${sum()},00</p>
          <div className='saloon-container-btn'>
            <Button className='saloon-finalize-order' text='Finalizar Pedido' onClick={handleSubmit}/>
          </div>  
          {isModalVisible ? 
            <Modal className='modal active' 
            onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null
          }
        </section>     
      </section>
    </div>
  )
}

export default Saloon;