import logo from '../../imgs/logo-burger-queen.png';
import Form from "../../components/Form";
import { createUser } from '../../services/auth';
import { useState } from 'react';

function Register() {

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
    console.log("e.target.value", e.target.value)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }  

  createUser(infosUser.name, infosUser.email, infosUser.password, infosUser.role) 
  .then((response) => {
    console.log(response.error)
  })

  return (
    <main className='main'>
      <img alt='Burger Queen Logo' className='logo' src={logo}></img>
      <Form formTitle='Cadastre-se' pathLink='/' textPath='Caso já tenha cadastro, faça Login'
        textButton='Cadastrar'  nameId='name' emailId='email' passwordId='password'  
        onChange={handleChange}
        onClick={handleSubmit}
        nameValue={infosUser.name}
        emailValue ={infosUser.email} passwordValue={infosUser.password}
      />
    </main>  
  )
}

export default Register;
