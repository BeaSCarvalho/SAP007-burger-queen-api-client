import React from "react";

import Button from "../Button";

import "./style.css"

const ItemOrderList = (props, key) => {
  return (
    <li className="item-container" key={key}>
      <p className="product-name">{props.name}</p>
      <div className="qtd-product">
        <Button className='product-qtd-btn' text='-' onClick={props.removeItem}/>
        <p className="number-qtd">{props.qtd}</p>
        <Button className='product-qtd-btn' text='+' onClick={props.addItem}/>
      </div>  
      <p className="product-complement">{props.complement}</p>
      <p className="product-price">R${props.price},00</p>
    </li>
  )    
}

export default ItemOrderList;