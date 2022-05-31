import React from "react";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";

import './style.css'

function Form(props){
  const pathnameRegister = window.location.pathname === '/register';
  return (
    <form className='form'>
      <h2 className='form-title'>{props.formTitle}</h2>
      {pathnameRegister ?
        <>
          <label className='radio-button'>
            <Input type='radio' id='role' value='saloon' name='role' onChange={props.onChange}/>Salão
          </label>
          <label className='radio-button'>
            <Input type='radio' id='role' value='kitchen' name='role' onChange={props.onChange}/>Cozinha
          </label>
          <Input className='form-input' id={props.nameId} type='text' placeholder='Nome' value={props.nameValue} onChange={props.onChange} />
        </>  : ''
      }
      <Input className='form-input' id={props.emailId} type='email' placeholder='E-mail' value={props.emailValue} onChange={props.onChange} />
      <Input className='form-input' id={props.passwordId} type='password' placeholder='Senha' value={props.passwordValue} onChange={props.onChange}/>
      <Button className='generic-button' text={props.textButton} onClick={props.onClick}/>
      <Link to={props.pathLink} className='link'>{props.textPath}</Link>
    </form>
  )
}

export default Form;