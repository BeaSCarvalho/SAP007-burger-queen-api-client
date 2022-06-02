import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { logOut, role } from "../../services/localStorage";

import './style.css';
import logo from '../../imgs/logo-burger-queen.png';

function Header(){
  const navigate = useNavigate();

  let titleHeader = '';
  if(role() === 'kitchen'){
    titleHeader = 'Cozinha'
  } else if (role() === 'saloon'){
    titleHeader = 'Atendimento'
  }

  function handleLogout() {
    logOut();
    navigate('../')
  }

  // function handleChangePage() {
  //   if(role() === 'manager'){
  //     navigate('../manager')
  //   } else {
  //     console.log('usuario sem permissão de acesso à página')
  //   }
  // }

  return (
    <header className='header-component'>
      <img className='header-logo' alt='Burger Queen Logo' src={logo}></img>
      <h1 className='header-title'>{titleHeader}</h1>
      <div className="header-buttons">  
        {/* <Button className='header-button' text={<i className="fa-solid fa-user"></i>} onClick={handleChangePage}/> */}
        <Button className='header-button' text={<i className="fa-solid fa-arrow-right-from-bracket"></i>} onClick={handleLogout}/>
      </div>  
    </header>
  )
}

export default Header;