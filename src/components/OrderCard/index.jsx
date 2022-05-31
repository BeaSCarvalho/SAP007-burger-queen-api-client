import React from "react";

import Button from "../Button";

const OrderCard = (props, key) => {
  const historicPage = window.location.pathname === '/historic';
  return (
    <li className="card-order"key={key}>
      <section className="change-status-card">
        {props.status === "pending" && (
          <div className="order-status bg-color-pending color-lightest">
            Pendente
          </div>
        )} 
        {props.status === "processing" && (
          <div className="order-status bg-color-yellow color-brown">
            Preparando
          </div>
        )}
        {props.status === "ready" && (
          <div className="order-status bg-color-green color-lightest">
            Pronto para servir
          </div>
        )}
        {props.status === "served" && (
          <div className="order-status bg-color-toclient color-lightest">
            Entregue
          </div>
        )}    
        <p>{props.id}</p>
        <p>Cliente: {props.clientName}</p>
        <p>Mesa: {props.table}</p>
        <p>Criado em: {props.createdAt}</p>
        <p>Finalizado em: {props.processedAt}</p>
        <p>Preparado em: {props.preparedAt}</p>
        <p>Entregue em: {props.updatedAt}</p>
        <p>{props.orderProducts}</p>
      </section>  
      {!historicPage ? 
        <section className='change-status-button'>
          {props.status === "pending" && (
            <Button text='Preparar' onClick={props.updateToProcessing}/>
          )}
          {props.status === "processing" && (
            <Button text='Pronto' onClick={props.updateToReady}/>
          )}
          {props.status === "ready" && (
            <Button text='Entregar' onClick={props.updateToDeliveried}/>
          )}
        </section> : ''
      }
    </li>
  )    
}

export default OrderCard;

