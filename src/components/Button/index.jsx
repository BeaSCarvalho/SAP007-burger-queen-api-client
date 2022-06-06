import React from "react";

import "./style.css";

const Button = (props) => {
  return (
    <button 
      type='submit'
      className={props.className}
      id={props.id}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button;