import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { logOut, role } from "../../services/localStorage";

import logo from "../../imgs/logo-burger-queen.png";
import "./style.css";

function Header(){
  const navigate = useNavigate();

  let titleHeader = "";
  if(role() === "kitchen"){
    titleHeader = "Cozinha"
  } else if (role() === "saloon"){
    titleHeader = "Atendimento"
  }

  function handleLogout() {
    logOut();
    navigate("/")
  }

  return (
    <header className='header-component'>
      <img className='header-logo' alt='Burger Queen Logo' src={logo}></img>
      <h1 className='header-title'>{titleHeader}</h1>
      <div className="header-buttons">  
        <Button type='button' className='header-button' text={<i className="fa-solid fa-arrow-right-from-bracket"></i>} onClick={handleLogout}/>
      </div>  
    </header>
  )
}

export default Header;