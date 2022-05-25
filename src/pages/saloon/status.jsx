import Header from "../../components/Header";
import Nav from "../../components/Nav";

function Status(){
  return (
    <>
    <Header title="Atendimento"/>
    <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
     pathLinkThree='/historic' textPathThree='Histórico'/>
    <p></p>
    </>
  )
}

export default Status;