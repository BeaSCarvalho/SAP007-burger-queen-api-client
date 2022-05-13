import React from "react";

import './style.css';

const Input = (props) => {
  return (
    <input 
      className={props.className}
      id={props.id}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder} 
      value={props.value}
      onChange={props.onChange} 
    />
  )
}

export default Input;