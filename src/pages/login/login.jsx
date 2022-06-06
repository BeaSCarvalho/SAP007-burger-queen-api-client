import { useState } from "react";
import { userLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { setUserTokenAndRole } from "../../services/localStorage";


import Form from "../../components/Form";
import Modal from "../../components/Modal";

import styles from "./login.module.css";
import logo from "../../imgs/logo-burger-queen.png";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlYUBhdGVuZGVudGUuY29tIiwiaWQiOjM4ODQsImlhdCI6MTY1MzUwNTM3MiwiZXhwIjoxNjg1MDYyOTcyfQ.aIEWlgdnlGfv9zeRyN_W3dHg-lCgT5P6Pm_0TNW4JP8
function Login() {
  const navigate = useNavigate();


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [infosUser, setInfosUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setInfosUser({
      ...infosUser,
      [e.target.id]: e.target.value
    })
    console.log("e.target.value", e.target.value)
  }

  function handleSubmit (e){
      e.preventDefault();
      if(infosUser.email === "" || infosUser.password === ""){
        setIsModalVisible(true)
        setErrorMessage("Preencha todos os campos")
      } else{
        userLogin(infosUser.email, infosUser.password)
        .then((response) =>{
          switch (response.role) {
            case "manager":
              setUserTokenAndRole(response.role, response.token)
              navigate("../manager")
            case "saloon":
              setUserTokenAndRole(response.role, response.token)
              navigate("../saloon")
              break;
            case "kitchen":
              setUserTokenAndRole(response.role, response.token)
              navigate("../kitchen")
              break;
            default:
              navigate("../")    
          }
      
          switch (response.status) {
            case 400:
              setIsModalVisible(true)
              setErrorMessage("Email/Senha inválida");
              break;
            default:
              setIsModalVisible(true)
              setErrorMessage("Erro, tente novamente");
          }
        })
        .catch((error) => error)
  }
  }

  return (
    <main className={styles.main} data-testid="login-test">
      <img className={styles.logo} alt='Burger Queen Logo' src={logo}></img>
      <Form formTitle='Login' pathLink='/register' textPath='Cadastrar novo funcionário' textButton='Entrar'
        emailId='email' passwordId='password'  
        onChange={handleChange}
        onClick={handleSubmit}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
      {isModalVisible ? <Modal className='modal active' 
        onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null
      }
    </main>
  );  
};

export default Login;