import React from "react";

import Button from "../Button";

import "./style.css"

export const OrderCard = ({key, status, id, clientName, table, createdAt, processedAt,
    preparedAt, updatedAt, orderProducts, updateToProcessing, updateToReady, updateToDeliveried
  }) => {
  const historicPage = window.location.pathname === "/historic";
  return (
    <li className="card-order" key={key}>
      <section className="change-status-card">
        {status === "pending" && (
          <div className="order-status color-pending color-lightest">
            Pendente
          </div>
        )} 
        {status === "processing" && (
          <div className="order-status color-processing color-brown">
            Preparando
          </div>
        )}
        {status === "ready" && (
          <div className="order-status color-ready color-lightest">
            Pronto para servir
          </div>
        )}
        {status === "served" && (
          <div className="order-status color-served color-lightest">
            Entregue
          </div>
        )}
        <section className='infos-card-order'> 
          <p className="p-info">{id}</p>
          <p className="p-info">Cliente: {clientName}</p>
          <p className="p-info">Mesa: {table}</p>
          <p className="p-info">Criado em: {createdAt}</p>
          <p className="p-info">Finalizado em: {processedAt}</p>
          <p className="p-info">Preparado em: {preparedAt}</p>
          <p className="p-info">Entregue em: {updatedAt}</p>
          <div className="p-info">{orderProducts}</div>
        </section>  
      </section>  
      <section className='change-status-button'>
        {!historicPage ? 
          <>
            {status === "pending" && (
              <Button text='Preparar' className='product-button' onClick={updateToProcessing}/>
            )}
            {status === "processing" && (
              <Button text='Pronto' className='product-button' onClick={updateToReady}/>
            )}
            {status === "ready" && (
              <Button text='Entregar' className='product-button' onClick={updateToDeliveried}/>
            )}
          </> : ""
        }
      </section>
    </li>
  )    
}

export const OrderProduct = (props, key) => {
  
  return (
    <div className='container-products-order' key={key}>
      <p className='items-title'>Item:</p>
      <p className='p-info-product'>{props.name}</p>
      <p className='p-info-product'>{props.flavor}</p>
      <p className='p-info-product'>Complemento: {props.complement}</p>
      <p className='p-info-product'>Quantidade: {props.qtd}</p>
    </div>
  )    
}




