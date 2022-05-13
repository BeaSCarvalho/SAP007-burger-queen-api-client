import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

import './style.css';

function Paths() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default Paths;
