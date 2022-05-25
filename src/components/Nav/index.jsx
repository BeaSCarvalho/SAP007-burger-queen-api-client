import React from "react";
import { Link } from 'react-router-dom';

import './style.css';

const Nav = (props) => {
  return (
    <nav className="nav">
      <ul className="list">
        <li><Link to={props.pathLinkOne} className='nav-link'>{props.textPathOne}</Link></li>
        <li><Link to={props.pathLinkTwo} className='nav-link'>{props.textPathTwo}</Link></li>
        <li><Link to={props.pathLinkThree} className='nav-link'>{props.textPathThree}</Link></li>
      </ul>  
    </nav>
  )    
}

export default Nav;