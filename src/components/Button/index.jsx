import React from "react";

import "./style.css";

const Button = ({text, ...rest}) => {
  return (
    <button 
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button;