import Form from "../../components/Form";

import './login.css';
import logo from '../../imgs/logo-burger-queen.png';

function Login() {
  return (
    <main className='main'>
      <img className='logo' alt='Burger Queen Logo' src={logo}></img>
      <Form formTitle='Login' pathLink='/register' textPath='Cadastrar novo funcionário' textButton='Entrar'/>
    </main>
  );  
};

export default Login;