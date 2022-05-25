import { useState } from 'react';
import { userLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { userToken } from "../../services/localStorage";
//import { code } from '../../services/errorMessages';

import Form from "../../components/Form";
import Modal from "../../components/Modal";

import './login.css';
import logo from '../../imgs/logo-burger-queen.png';

//token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlYXByb3NjYXJ2YUBnbWFpbC5jb20iLCJpZCI6MzU3OSwiaWF0IjoxNjUyNzI0MTExLCJleHAiOjE2ODQyODE3MTF9.RuzCyC1OVwSDJ5ebV_iu6P17em4KL6o-KInxZ-kByjQ

function Login() {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [infosUser, setInfosUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setInfosUser({
      ...infosUser,
      [e.target.id]: e.target.value
    })
    console.log("e.target.value", e.target.value)
  }

  async function handleSubmit (e){
    try{
      e.preventDefault();
      if(infosUser.email === '' || infosUser.password === ''){
        setIsModalVisible(true)
        setErrorMessage("Preencha todos os campos")
      } else{
        const response = await userLogin(infosUser.email, infosUser.password);
        const returnJson = await response.json();
        userToken(returnJson.token);
        if (returnJson.token) {
          localStorage.setItem('userToken', returnJson.token)
        }
        switch (returnJson.role) {
          case 'saloon':
            navigate('../saloon')
            break;
          case 'kitchen':  
            navigate('../kitchen')
            break;
          default:
            navigate('../')    
        }

        setIsModalVisible(true)
      
        switch (response.status) {
          case 400:
            setErrorMessage("Email/Senha inválida");
            break;
          default:
            setErrorMessage("Erro, tente novamente");
        }
      }
    } catch(error) { console.log("erro", error)}
  }

  return (
    <main className='main' data-testid="login-test">
      <img className='logo' alt='Burger Queen Logo' src={logo}></img>
      <Form formTitle='Login' pathLink='/register' textPath='Cadastrar novo funcionário' textButton='Entrar'
        emailId='email' passwordId='password'  
        onChange={handleChange}
        onClick={handleSubmit}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
      {isModalVisible ? <Modal className='modal active' onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null}
    </main>
  );  
};

export default Login;