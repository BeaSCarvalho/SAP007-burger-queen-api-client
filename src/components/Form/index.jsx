import React from "react";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";

import "./style.css"

function Form({page, nameId, nameValue, onChange, onSubmit, emailId, emailValue, passwordId, passwordValue, textButton, textPath, formTitle, pathLink}){
  const locationPage = page === "register"

  return (
    <form className='form' onSubmit={onSubmit} page={page}>
      <h2 className='form-title'>{formTitle}</h2>
      {locationPage &&
        <>
          <label className='radio-button'>
            <Input type='radio' id='role' value='saloon' name='role' onChange={onChange}/>Salão
          </label>
          <label className='radio-button'>
            <Input type='radio' id='role' value='kitchen' name='role' onChange={onChange}/>Cozinha
          </label>
          <Input className='form-input' id={nameId} type='text' placeholder='Nome' value={nameValue} onChange={onChange} />
        </>
      }
      <Input className='form-input' id={emailId} type='email' placeholder='E-mail' value={emailValue} onChange={onChange} />
      <Input className='form-input' id={passwordId} type='password' placeholder='Senha' value={passwordValue} onChange={onChange}/>
      <Button className='generic-button' text={textButton} type='submit'/>
      <Link to={pathLink} className='link'>{textPath}</Link>
    </form>
  )
}

export default Form;