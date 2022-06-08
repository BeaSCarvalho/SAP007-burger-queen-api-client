import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/auth";
import { setUserTokenAndRole } from "../../services/localStorage";

import Form from "../../components/Form";
import Modal from "../../components/Modal";

import logo from "../../imgs/logo-burger-queen.png";
import styles from "./login.module.css";

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
  }

  async function handleSubmit (e){
    e.preventDefault();
    if(infosUser.email === "" || infosUser.password === ""){
      setIsModalVisible(true)
      setErrorMessage("Preencha todos os campos")
    } else{
        try {
          const response = await userLogin(infosUser.email, infosUser.password);
          switch (response.status) {
            case 200:
              const data = await response.json();
              setUserTokenAndRole(data.role, data.token);
              navigate(`../${data.role}`);
              break;
            case 400:
              setIsModalVisible(true)
              setErrorMessage("Email/Senha inválida");
              break;
            default:
              setIsModalVisible(true)
              setErrorMessage("Erro, tente novamente");
          }
        } catch (error) {
            setIsModalVisible(true)
            setErrorMessage(error);
        }   
      }
  }

  return (
    <main className={styles.main} data-testid="login-test">
      <img className={styles.logo} alt='Burger Queen Logo' src={logo}></img>
      <Form formTitle='Login' pathLink='/register' textPath='Cadastrar novo funcionário' textButton='Entrar'
        emailId='email' passwordId='password'  
        onChange={handleChange}
        onSubmit={handleSubmit}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
      {isModalVisible ? <Modal className='modal active' 
        onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal> : null
      }
    </main>
  );  
};

export default Login;