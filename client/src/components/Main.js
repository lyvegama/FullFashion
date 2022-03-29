import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Mapa from "./Mapa";
import Home from "../pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Perfil from "../pages/Perfil";
import RecogidaLook from "./RecogidaLook";
import ResultadoLook from "../pages/ResultadoLook";
import DatosCompraLogueado from "../pages/DatosCompraLogueado";
import DatosCompraNoLogueado from "../pages/DatosCompraNoLogueado";
import MostrarFactura from "../pages/MostrarFactura";
import Payment from "./stripe";
import DatosEnvioNoLogueado from "../pages/DatosEnvioNoLogueado";
import Admin from "./Admin";
import Devolucion from "../pages/Devolucion";
import Baneado from "../pages/Baneado";
import Privacy from "./Privacy";
import DevueltoP from "../pages/DevueltoP";
import DevueltoTodo from "../pages/DevueltoTodo";
import CambioPass from "../pages/CambioPass";

class Main extends Component {


  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/recogidalook" element={<RecogidaLook />} />
          <Route path="/resultadolook" element={<ResultadoLook />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/datoscompralogueado" element={<DatosCompraLogueado />} />
          <Route path="/datoscompranologueado" element={<DatosCompraNoLogueado />} />
          <Route path="/mostrarfactura" element={<MostrarFactura />} />
          <Route path="/datosenvionologueado" element={<DatosEnvioNoLogueado />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/devolucion" element={<Devolucion/>} />
          <Route path="/baneado" element={<Baneado/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/devueltop" element={<DevueltoP />} />
          <Route path="/devueltotodo" element={<DevueltoTodo />} />
          <Route path="/cambiarpass/:id/:token" element={<CambioPass />} />


        </Routes>
      </div>
    );
  }
}
export default Main;
