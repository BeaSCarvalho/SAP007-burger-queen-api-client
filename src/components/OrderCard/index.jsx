import React from "react";

import Button from "../Button";

import './style.css'

export const OrderCard = (props, key) => {
  const historicPage = window.location.pathname === '/historic';
  return (
    <li className="card-order" key={key}>
      <section className="change-status-card">
        {props.status === "pending" && (
          <div className="order-status color-pending color-lightest">
            Pendente
          </div>
        )} 
        {props.status === "processing" && (
          <div className="order-status color-processing color-brown">
            Preparando
          </div>
        )}
        {props.status === "ready" && (
          <div className="order-status color-ready color-lightest">
            Pronto para servir
          </div>
        )}
        {props.status === "served" && (
          <div className="order-status color-served color-lightest">
            Entregue
          </div>
        )}
        <section className='infos-card-order'> 
          <p className="p-info">{props.id}</p>
          <p className="p-info">Cliente: {props.clientName}</p>
          <p className="p-info">Mesa: {props.table}</p>
          <p className="p-info">Criado em: {props.createdAt}</p>
          <p className="p-info">Finalizado em: {props.processedAt}</p>
          <p className="p-info">Preparado em: {props.preparedAt}</p>
          <p className="p-info">Entregue em: {props.updatedAt}</p>
          <div className="p-info">{props.orderProducts}</div>
        </section>  
      </section>  
      <section className='change-status-button'>
        {!historicPage ? 
          <>
            {props.status === "pending" && (
              <Button text='Preparar' className='product-button' onClick={props.updateToProcessing}/>
            )}
            {props.status === "processing" && (
              <Button text='Pronto' className='product-button' onClick={props.updateToReady}/>
            )}
            {props.status === "ready" && (
              <Button text='Entregar' className='product-button' onClick={props.updateToDeliveried}/>
            )}
          </> : ''
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




