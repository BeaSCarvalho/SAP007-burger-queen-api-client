import React from "react";

import Button from "../Button";

import "./style.css"

const ItemOrderList = ({key, name, removeItem, qtd, addItem, complement, price}) => {
  return (
    <li className="item-container" key={key}>
      <p className="product-name">{name}</p>
      <div className="qtd-product">
        <Button className='product-qtd-btn' text='-' onClick={removeItem}/>
        <p className="number-qtd">{qtd}</p>
        <Button className='product-qtd-btn' text='+' onClick={addItem}/>
      </div>  
      <p className="product-complement">{complement}</p>
      <p className="product-price">R${price},00</p>
    </li>
  )    
}

export default ItemOrderList;