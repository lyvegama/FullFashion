import React from "react";
import { useState } from "react"

function DatosCompraNoLogueado() {


    let email = localStorage.getItem("emailNoLog")

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");

    function saveDatoUsuarioNoLog() {

        let datosUsuarioNoLog = {
          nombre,
          apellidos,
          dni,
          telefono,
          email
        };

        localStorage.setItem("datosNoLog", JSON.stringify(datosUsuarioNoLog));
        localStorage.removeItem("emailNoLog");
        window.location.href = "http://localhost:3000/datosenvionologueado"
      
      };

  return (
    <div>
      <br />
        <h3>Datos personales</h3>
        <form className="card card-body">
        <div className="form-control">
        <br />
        <label>Nombre:&nbsp;</label><br></br>
        <input type="text" name="nombre" placeholder="Ej: Juan"  onChange={(e) => {
            setNombre(e.target.value);
           
          }}></input>
        <br />
        <br />

        <label>Apellidos:&nbsp;</label><br></br>
        <input type="text" name="apellidos" placeholder="Ej: Sanchez Martinez"  onChange={(e) => {
            setApellidos(e.target.value);
           
          }}></input>
        <br />
        <br />

        <label>DNI:&nbsp;</label><br></br>
        <input
          type="text"
          name="dni"
          placeholder="Ej: 12345678X"
          onChange={(e) => {
            setDni(e.target.value);
           
          }}></input>
        <br />
        <br />

        <label>Teléfono:&nbsp;</label><br></br>
        <input
          type="text"
          name="telefono"
          placeholder="Ej: 625845298"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}></input>
        <br />
        <br />
        <button type="button" className="ButtonHome btn btn-primary btn-md" onClick={() => saveDatoUsuarioNoLog()}>Enviar</button>
        </div>
        </form>
    </div>
  );
}
export default DatosCompraNoLogueado;
