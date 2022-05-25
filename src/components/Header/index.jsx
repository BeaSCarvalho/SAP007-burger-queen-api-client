import React from "react";
import Button from "../Button";

import './style.css';
import logo from '../../imgs/logo-burger-queen.png';

function Header(props){
  return (
    <header className='header-component'>
      <img className='header-logo' alt='Burger Queen Logo' src={logo}></img>
      <h1 className='header-title'>{props.title}</h1>
      <div className="header-buttons">  
        <Button className='header-button' text={<i className="fa-solid fa-user"></i>}/>
        <Button className='header-button' text={<i className="fa-solid fa-arrow-right-from-bracket"></i>}/>
      </div>  
    </header>
  )
}

export default Header;