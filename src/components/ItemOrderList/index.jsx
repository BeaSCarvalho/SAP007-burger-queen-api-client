import React from "react";

import Button from "../Button";

const ItemOrderList = (props, key) => {
  return (
    <div className="item-container" key={key}>
      <p>{props.name}</p>
      <Button text='-' onClick={props.removeItem}/>
      <p>{props.qtd}</p>
      <Button text='+' onClick={props.addItem}/>
      <p>{props.complement}</p>
      <p>R${props.price},00</p>
    </div>
  )    
}

export default ItemOrderList;