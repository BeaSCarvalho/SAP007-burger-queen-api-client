import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Kitchen from "./pages/kitchen/kitchen";
import Saloon from "./pages/saloon/saloon";
import Status from "./pages/saloon/status";
import Historic from "./pages/saloon/historic";


import './style.css';

function Paths() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="saloon" element={<Saloon />} />
        <Route path="status" element={<Status />} />
        <Route path="historic" element={<Historic />} />
      </Routes>
    </>
  );
}

export default Paths;
