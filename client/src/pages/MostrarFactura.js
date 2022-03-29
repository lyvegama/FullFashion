import React from "react";
// import { enviarMail } from "../../../controllers/compras.controllers";
import ExportPdfComponent from "../components/ExportPdfComponent";
// import { useState } from "react"
import axios from "axios"

function MostrarFactura() {


  let datosFactura = JSON.parse(sessionStorage.getItem("datosFactura"))
  



  const enviarMail = async () => {
    const {email} = await axios.post("/enviarmail", datosFactura).then((res)=>{
      console.log("Email enviado");
      localStorage.removeItem("datosFactura")
    })
  }

  return (
    <div>
      <br />
      <br />
      <br />

        

        <h2>¡Muchas gracias por tu compra!</h2>
        <div>
        <ExportPdfComponent/>
        <br />
        <br />
        <button type="button" className="ButtonHome btn btn-primary btn-lg" onClick={enviarMail}>Enviar Mail</button>
      </div>
    </div>
  
  );
}
export default MostrarFactura;
