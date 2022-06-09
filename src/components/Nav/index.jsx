import { Link } from "react-router-dom";
import { role } from "../../services/localStorage";


import "./style.css";

const Nav = ({pathLinkOne, textPathOne, pathLinkTwo, textPathTwo, pathLinkThree, textPathThree}) => {
  const roleKitchen = role() === "kitchen";

  return (
    <nav className="nav">
      <ul className="list">
        <li><Link to={pathLinkOne} className='nav-link'>{textPathOne}</Link></li>
        <li><Link to={pathLinkTwo} className='nav-link'>{textPathTwo}</Link></li>
        {!roleKitchen && 
          <li><Link to={pathLinkThree} className='nav-link'>{textPathThree}</Link></li>
        }  
      </ul>  
    </nav>
  )    
}

export default Nav;
