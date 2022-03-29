import React from "react";
import { useState } from "react";
import { motion } from "framer-motion"
import Mapa from "../components/Mapa";
import { Checkbox } from "antd";

function DatosEnvioNoLogueado() {

  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [poblacionEnvio, setPoblacionEnvio] = useState("");
  const [cpEnvio, setCpEnvio] = useState("");
  const [modoEnvio, setModoEnvio] = useState("");

  const [viewOpcionesCorreoOrdinario, setViewOpcionesCorreoOrdinario] = useState(false);
  const [viewAlertaIntroducirDireccionOrdinario, setViewAlertaIntroducirDireccionOrdinario] = useState(false);
  const [viewAlertaIntroducirPoblacionOrdinario, setViewAlertaIntroducirPoblacionOrdinario] = useState(false);
  const [viewAlertaIntroducirCpOrdinario, setViewAlertaIntroducirCpOrdinario] = useState(false);

  const [viewOpcionesCorreoPref, setViewOpcionesCorreoPref] = useState(false);
  const [viewAlertaIntroducirDireccionPref, setViewAlertaIntroducirDireccionPref] = useState(false);
  const [viewAlertaIntroducirPoblacionPref, setViewAlertaIntroducirPoblacionPref] = useState(false);
  const [viewAlertaIntroducirCpPref, setViewAlertaIntroducirCpPref] = useState(false);

  const [viewAlertaIntroducirDireccionRecog, setViewAlertaIntroducirDireccionRecog] = useState(false);
  const [viewAlertaIntroducirNombreRecog, setViewAlertaIntroducirNombreRecog] = useState(false);
  const [viewAlertaIntroducirPoblacionRecog, setViewAlertaIntroducirPoblacionRecog] = useState(false);

  const [viewAlertaIntroducirDireccion, setviewAlertaIntroducirDireccion] = useState(false)
  const [viewOpcionesPuntoRecog, setViewOpcionesPuntoRecog] = useState(false);

  var datosUser = JSON.parse(localStorage.getItem("datosNoLog"));
  var emailUser = datosUser.email;
  var nombreUser = datosUser.nombre;
  var apellidosUser = datosUser.apellidos;
  var dniUser = datosUser.dni;
  var telfUser = datosUser.telefono;

  function addDirection() {
    let entrega = {
      nombre: nombreUser,
      apellidos: apellidosUser,
      dni: dniUser,
      email: emailUser,
      telefono: telfUser,
      direccion: direccionEnvio,
      poblacion: poblacionEnvio,
      cp: cpEnvio,
      modoEnvio: modoEnvio[0],
    }
    localStorage.setItem("datosNoLog", JSON.stringify(entrega));

    window.location.href = "http://localhost:3000/payment"
  };

  function addDirectionRecog() {
    let entrega = {
      nombre: nombreUser,
      apellidos: apellidosUser,
      dni: dniUser,
      email: emailUser,
      telefono: telfUser,
      cp: cpEnvio,
      direccion: direccionEnvio,
      poblacion: poblacionEnvio,
      modoEnvio: modoEnvio[0]
    }
    localStorage.setItem("datosNoLog", JSON.stringify(entrega));

    window.location.href = "http://localhost:3000/payment";
  }

  const onChangeCheckEnvio = (checkedValues) => {
    setModoEnvio(checkedValues);
  };

  const isDisabledEnvio = (id) => {
    return modoEnvio.length > 0 && modoEnvio.indexOf(id) === -1;
  }

  return (
    <div>
      <Checkbox.Group onChange={(e) => onChangeCheckEnvio(e)}>
        <div>
          {/* CORREO ORDINARIO */}
          <br />
          <br />
          <br />
          <img src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/imagenes%20envio/Correos-Symbol.png" alt="Correos"></img>
          <Checkbox
            className="checkEnvio"
            value="correos"
            id="correos"
            name="modoEnvio"
            disabled={isDisabledEnvio("correos")}
            onChange={(e) => {
              if (!viewOpcionesCorreoOrdinario) {
                setViewOpcionesCorreoOrdinario(true)
              } else {
                setViewOpcionesCorreoOrdinario(false)
              }
            }
            }>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Envío a través de Correos España</label>
          </Checkbox>

          {viewOpcionesCorreoOrdinario ? (
            <div>
              <label>Dirección:</label>
              <br />
              <input type="text"
                onChange={(e) => setDireccionEnvio(e.target.value)}
              />
              {viewAlertaIntroducirDireccionOrdinario ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce una dirección válida</motion.p>

              </div>) : ""}
              <br />

              <label>Población:</label>
              <br />
              <input type="text"
                onChange={(e) => setPoblacionEnvio(e.target.value)}
              />
              {viewAlertaIntroducirPoblacionOrdinario ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce una población válida</motion.p>

              </div>) : ""}
              <br />

              <label>Código Postal:</label>
              <br />
              <input type="text"
                onChange={(e) => setCpEnvio(e.target.value)}
              />
              {viewAlertaIntroducirCpOrdinario ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce un código postal válido</motion.p>

              </div>) : ""}
            </div>) : ""}
        </div>
        <br />

        {/* // CORREO PREFERENTE */}

        <div>

          <img src="https://raw.githubusercontent.com/moramraul/imagenesFashion/3659924410e59d2d3f420f6acaa543d559cee971/imagenes%20envio/MRW_logo.svg" alt="Correos"></img>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Checkbox
            className="checkEnvio"
            value="mrw"
            id="mrw"
            name="modoEnvio"
            disabled={isDisabledEnvio("mrw")}
            onChange={(e) => {
              if (!viewOpcionesCorreoPref) {
                setViewOpcionesCorreoPref(true)
              } else {
                setViewOpcionesCorreoPref(false)
              }
            }
            }>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Envío a través de MRW España</label>
          </Checkbox>

          {viewOpcionesCorreoPref ? (
            <div>
              <label>Dirección:</label>
              <br />
              <input type="text"
                onChange={(e) => setDireccionEnvio(e.target.value)}
              />
              {viewAlertaIntroducirDireccionPref ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce una dirección válida</motion.p>

              </div>) : ""}
              <br />

              <label>Población:</label>
              <br />
              <input type="text"
                onChange={(e) => setPoblacionEnvio(e.target.value)}
              />
              {viewAlertaIntroducirPoblacionPref ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce una población válida</motion.p>

              </div>) : ""}
              <br />

              <label>Código Postal:</label>
              <br />
              <input type="text"
                onChange={(e) => setCpEnvio(e.target.value)}
              />
              {viewAlertaIntroducirCpPref ? (<div>
                <motion.p
                  initial={{ x: -1000, color: "#e30b2c" }}
                  animate={{ fontSize: 20, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >Introduce un código postal válido</motion.p>
              </div>) : ""}
            </div>) : ""}
        </div>
       <br />
       <br />

  {/* PUNTO DE RECOGIDA */ }


  <div>
    <img src="https://1000marcas.net/wp-content/uploads/2020/01/logo-Leroy-Merlin-1-500x300.png" height={100} width={166} alt="Correos"></img>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Checkbox
      className="checkEnvio"
      value="recogida"
      name="modoEnvio"
      id="recogida"
      disabled={isDisabledEnvio("recogida")}
      onChange={(e) => {
        onChangeCheckEnvio(e.target.value);
        if (!viewOpcionesPuntoRecog) {
          setViewOpcionesPuntoRecog(true)
          setDireccionEnvio("");
          setPoblacionEnvio("");
          setCpEnvio("");
        } else {
          setViewOpcionesPuntoRecog(false)
        }
      }
      }>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label>Recoger en un punto de recogida oficial</label>
    </Checkbox>
    {viewOpcionesPuntoRecog ? (
      <div>
        <br />
        <label>Nombre:</label>
        <br />
        <input type="text"
          onChange={(e) => setCpEnvio(e.target.value)}
        />
        {viewAlertaIntroducirNombreRecog ? (<div>
          <motion.p
            initial={{ x: -1000, color: "#e30b2c" }}
            animate={{ fontSize: 20, x: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Introduce un punto de recogida válido</motion.p>

        </div>) : ""}
        <br />
        <br />
        <label>Dirección:</label>
        <br />
        <input type="text"
          onChange={(e) => setDireccionEnvio(e.target.value)}
        />
        {viewAlertaIntroducirDireccionRecog ? (<div>
          <motion.p
            initial={{ x: -1000, color: "#e30b2c" }}
            animate={{ fontSize: 20, x: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Introduce una dirección válida</motion.p>

        </div>) : ""}
        <br />
        <br />
        <label>Población:</label>
        <br />
        <input type="text"
          onChange={(e) => setPoblacionEnvio(e.target.value)}
        />
        {viewAlertaIntroducirPoblacionRecog ? (<div>
          <motion.p
            initial={{ x: -1000, color: "#e30b2c" }}
            animate={{ fontSize: 20, x: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Introduce un código postal válido</motion.p>

        </div>) : ""}

        <br />
        <br />
        <Mapa />
      </div>) : ""}
    <br />
    {viewAlertaIntroducirDireccion ? (<div>
      <motion.p
        initial={{ x: -1000, color: "#e30b2c" }}
        animate={{ fontSize: 20, x: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >Introduce una dirección válida</motion.p>
    </div>) : ""}

    <br />
  </div>
      </Checkbox.Group >

      <br />

    {/* BOTON */ }
    < button className="ButtonHome btn btn-primary btn-lg" onClick = {() => {
    if (modoEnvio[0] === "correos") {
      if (direccionEnvio === "") {
        setViewAlertaIntroducirDireccionOrdinario(true)
      }
      if (poblacionEnvio === "") {
        setViewAlertaIntroducirPoblacionOrdinario(true)
      }
      if (cpEnvio === "") {
        setViewAlertaIntroducirCpOrdinario(true)
      }
      if (direccionEnvio !== "" && poblacionEnvio !== "" && cpEnvio !== "") {
        addDirection();
      }
    }
    if (modoEnvio[0] === "mrw") {
      if (direccionEnvio === "") {
        setViewAlertaIntroducirDireccionPref(true)
      }
      if (poblacionEnvio === "") {
        setViewAlertaIntroducirPoblacionPref(true)
      }
      if (cpEnvio === "") {
        setViewAlertaIntroducirCpPref(true)
      }
      if (direccionEnvio !== "" && poblacionEnvio !== "" && cpEnvio !== "") {
        addDirection();
      }

    }
    if (modoEnvio[0] === "recogida") {
      if (direccionEnvio === "") {
        setViewAlertaIntroducirDireccionRecog(true)
      }
      if (poblacionEnvio === "") {
        setViewAlertaIntroducirPoblacionRecog(true)
      }
      if (cpEnvio === "") {
         setViewAlertaIntroducirNombreRecog(true)
      }
      if (direccionEnvio !== "" && poblacionEnvio !== "" && cpEnvio !== "") {
        addDirectionRecog();
      }

    } else {
      setviewAlertaIntroducirDireccion(false)
      addDirection();
    }

  }
}>

  Enviar</button >
    <br></br>

    </div >
  );
}
export default DatosEnvioNoLogueado;
