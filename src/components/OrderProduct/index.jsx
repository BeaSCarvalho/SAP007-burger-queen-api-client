import React from "react";

const OrderProduct = (props, key) => {
  
  return (
    <div key={key}>
      <p>{props.name}</p>
      <p>{props.flavor}</p>
      <p>Complemento: {props.complement}</p>
      <p>Quantidade: {props.qtd}</p>
    </div>
  )    
}

export default OrderProduct;