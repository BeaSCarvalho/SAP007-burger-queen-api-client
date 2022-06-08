import { createUser } from "../../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserTokenAndRole } from "../../services/localStorage"; 

import logo from "../../imgs/logo-burger-queen.png";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

import styles from "../login/login.module.css";

function Register() {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [infosUser, setInfosUser] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })
  
  const handleChange = (e) => {
    setInfosUser({
      ...infosUser,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(infosUser.name,
        infosUser.email, infosUser.password, infosUser.role
      ) 
      switch (response.status){
        case 200: 
          const data = await response.json();
          setUserTokenAndRole(data.role, data.token)
          navigate(`../${data.role}`)
        case 400:
          setErrorMessage("Preencha todos os campos");
          break;
        case 403:
          setErrorMessage("Email já cadastrado");
          break;
        default:
          setErrorMessage("Erro, tente novamente");
      }     
    } catch (error) {
        return error
    } 
  }

  return (
    <main className={styles.main}>
      <img alt='Burger Queen Logo' className={styles.logo} src={logo}></img>
      <Form page ='register' formTitle='Cadastre-se' pathLink='/' textPath='Caso já tenha cadastro, faça Login'
        textButton='Cadastrar'  nameId='name' emailId='email' passwordId='password'  
        onChange={handleChange}
        onSubmit={handleSubmit}
        nameValue={infosUser.name}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
      {isModalVisible && <Modal className={"active"} onClose= {() => setIsModalVisible(false)}>{errorMessage}</Modal>}
    </main>  
  )
}

export default Register;
