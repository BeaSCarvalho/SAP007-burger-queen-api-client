import React from "react";
import Button from "../Button";

import './style.css'

function Product(props, key){
  const hideButton = props.complement === null
  return (
  <li className='card-product' key={key}>
    <p className='name-product'>{props.name} {props.flavor}</p>
    <img className='img-product' src={props.image} alt={props.name}></img>
    <section className="complement-section">
      <p className='complement-product'>{props.complement}</p>
      {hideButton ? '':
        <Button className='circle-button' text='+' onClick={props.onClickAdd}/>
      }
    </section>  
    <p className='price-product'>R${props.price},00</p>
    <Button className='product-button' text='Adicionar' onClick={props.onClick}/>
  </li>
  )
}

export default Product;