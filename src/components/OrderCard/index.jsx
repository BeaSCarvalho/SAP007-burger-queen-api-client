import React from "react";

import Button from "../Button";

import "./style.css"

export const OrderCard = ({status, id, clientName, table, createdAt, processedAt,
    preparedAt, updatedAt, orderProducts, updateToProcessing, updateToReady, updateToDeliveried
  }) => {
  const historicPage = window.location.pathname === "/historic";
  return (
    <li className="card-order">
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
          <p className="p-info-id">{id}</p>
          <p className="p-info-client">Cliente: {clientName}</p>
          <p className="p-info-table">Mesa: {table}</p>
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

export const OrderProduct = ({name, flavor, complement, qtd}) => {
  
  return (
    <div className='container-products-order'>
      <p className='items-title'>Item:</p>
      <p className='p-info-product'>{name}</p>
      <p className='p-info-product'>{flavor}</p>
      <p className='p-info-product'>Complemento: {complement}</p>
      <p className='p-info-product'>Quantidade: {qtd}</p>
    </div>
  )    
}




