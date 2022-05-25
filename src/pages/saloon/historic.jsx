import Header from "../../components/Header";
import Nav from "../../components/Nav";

function Historic(){
  return (
    <div className='saloon-container'>
      <Header title="Atendimento"/>
      <Nav pathLinkOne='/saloon' textPathOne='Novo Pedido' pathLinkTwo='/status' textPathTwo='Status Pedidos'
        pathLinkThree='/historic' textPathThree='Histórico'/>
    </div>
  )
}

export default Historic;