import { createUser } from '../../services/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setUserTokenAndRole } from '../../services/localStorage'; 

import logo from '../../imgs/logo-burger-queen.png';
import Form from "../../components/Form";
import Modal from '../../components/Modal';

import styles from '../login/login.module.css';

function Register() {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [infosUser, setInfosUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })
  
  const handleChange = (e) => {
    setInfosUser({
      ...infosUser,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(infosUser.name, infosUser.email, infosUser.password, infosUser.role) 
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      setIsModalVisible(true)
      switch (response.status) {
        case 400:
          setErrorMessage("Preencha todos os campos");
          break;
        case 403:
          setErrorMessage("Email já cadastrado");
          break;
        default:
          setErrorMessage("Erro, tente novamente");
      } 
    })
    .then((data) => {
      setUserTokenAndRole(data.role, data.token)
      console.log(data.token)
      if(data.role === 'saloon') {
        navigate('../saloon')
      } else if(data.role === 'kitchen'){
        navigate('../kitchen')
      }
    })
    .catch((error) => error)
  }

  return (
    <main className={styles.main}>
      <img alt='Burger Queen Logo' className={styles.logo} src={logo}></img>
      <Form formTitle='Cadastre-se' pathLink='/' textPath='Caso já tenha cadastro, faça Login'
        textButton='Cadastrar'  nameId='name' emailId='email' passwordId='password'  
        onChange={handleChange}
        onClick={handleSubmit}
        nameValue={infosUser.name}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
      {isModalVisible ? <Modal className={'active'} onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null}
    </main>  
  )
}

export default Register;
