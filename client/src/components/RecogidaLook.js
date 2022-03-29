import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { motion } from "framer-motion";
import { Checkbox } from "antd";
import { Row, Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecogidaLook = () => {
  const [target, setTarget] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");
  const [color, setColor] = useState("");
  const [estilo, setEstilo] = useState("");
  const [quien, setQuien] = useState("");
  const [email, setEmail] = useState("");

  const [viewTarget, setViewTarget] = useState(false);
  const [viewAlturaPeso, setViewAlturaPeso] = useState(false);
  const [viewTalla, setViewTalla] = useState(false);
  const [viewColor, setViewColor] = useState(false);
  const [viewEstilo, setViewEstilo] = useState(false);
  const [viewQuien, setViewQuien] = useState(true);
  const [viewEmail, setViewEmail] = useState(false);
  const [viewAlertaEmail, setViewAlertaEmail] = useState(false);
  const [viewAlertaAltura, setViewAlertaAltura] = useState(false);
  const [viewAlertaPeso, setViewAlertaPeso] = useState(false);
  const [viewAlertaColor, setViewAlertaColor] = useState(false);
  const [viewSubmit, setViewSubmit] = useState(false);

  const [data, setData] = useFetch("busquedalook");

  const onChangeCheck = (checkedValues) => {
    setColor(checkedValues);
  };

  const isDisabled = (id) => {
    return color.length > 1 && color.indexOf(id) === -1;
  };

  const pesoAlturaOk = (valor) => {
    var regExpPesoAltura = new RegExp(/^\d{2,3}$/);
    return regExpPesoAltura.test(valor)
  }


  function correoOk(email) {
    var regExpEmail = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
    return regExpEmail.test(email)
  }
 
  const estaLogueado = () => {
    let logueado = sessionStorage.getItem("infoUser")
    if (logueado !== null) {
      return true
    } else {
      return false
    }
  }

  function obtenerTarget() {
    let logueado = JSON.parse(sessionStorage.getItem("infoUser"))
    return logueado.target
  }

  const searchData = () => {
    localStorage.setItem("quien", quien)
    localStorage.setItem("emailNoLog", email)
    let colorEstilo = {
      color,
      estilo,
      target
    }
    localStorage.setItem("filtrosCompra", JSON.stringify(colorEstilo))

    let datos = {
      target,
      altura,
      peso,
      talla,
      color,
      estilo,
    };
    console.log(datos);
    setData(datos);
  };

  return (
    <div className="divFormLook">
      
      <br /> <br />

      {/* ELEGIR DSTINATARIO DE LA COLLECIÓN */}
      {viewQuien? (<motion.div
        initial={{ y: -1050, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input
          type="button"
          className="buttonFormLook"
          value="Es para mi"
          onClick={() => {
            setQuien("myself");
            let log = estaLogueado()
            if (log) {
              let targetLog = obtenerTarget();
              setTarget(targetLog)
              setViewQuien(false);
              setViewColor(true)
            } else {
              setViewQuien(false);
              setViewEmail(true);
            }

          }}
        />
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        <input
          type="button"
          className="buttonFormLook"
          value="Es un regalo"
          onClick={() => {
            let log = estaLogueado()
            if (log) {
              setQuien("regalo");
              setViewQuien(false);
              setViewTarget(true);
            } else {
              setQuien("regalo");
              setViewQuien(false);
              setViewEmail(true);
            }
          }}
        />
        <br />
        <br />
      </motion.div>) : ""}
      {viewEmail? (<motion.div
        initial={{ y: -2550, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Introduce tu email</h2> &nbsp;&nbsp;

        <br />
        <br />
        <input
          type="email"
          className=""
          id="inputEmail"
          placeholder="correo@dominio.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {viewAlertaEmail ? (<div>
          <motion.p
            initial={{ x: -1000, color: "#e30b2c" }}
            animate={{ fontSize: 20, x: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Por favor, introduce un correo electronico válido</motion.p>
        </div>) : ""}
        <br />
        <input
          type="button"
          className="buttonFormLook"
          value="Anterior"
          onClick={() => {
            setViewQuien(true);
            setViewEmail(false)
          }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="button"
          className="buttonFormLook"
          value="Siguiente"
          onClick={() => {
            if (email === "") {
              setViewAlertaEmail(true);
            } else {
              let emailOk = correoOk(email);
              if(emailOk) {
                setViewEmail(false);
                setViewTarget(true);
                setViewAlertaEmail(false);
              } else {
                setViewAlertaEmail(true);
              }
            
          }
          }}
        />
      </motion.div>) : ""}

      {/* TIPO DE PERSONA (TARGET) */}
      {viewTarget? (<motion.div
        initial={{ y: -1000, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
      
        <h1>Tu Perfil</h1>
        <br />
        <br />
        <h2>Selecciona sexo y rango de edad</h2>
        <br />
        <br />
        <br />

        <Row>
          <Col xs={6} md={3}>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="image"
            width="90%"
            height="90%"
            className="persona"
            src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/muher.jpg"
            value="mujer"
            onClick={
              (e) => {
                setTarget(e.target.value);
                setViewAlturaPeso(true);
                setViewTarget(false);
              }
            }
          />
          </Col>
          <Col xs={6} md={3}>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="image"
            width="90%"
            height="90%"
            className="persona"
            src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/niño.jpg"
            value="niño"
            onClick={
              (e) => {
                setTarget(e.target.value);
                setViewAlturaPeso(true);
                setViewTarget(false);
              }
            }
          />
          
          </Col>
          <Col xs={6} md={3}>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="image"
            width="90%"
            height="90%"
            className="persona"
            src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/niña.jpg"
            value="niña"
            onClick={
              (e) => {
                setTarget(e.target.value);
                setViewAlturaPeso(true);
                setViewTarget(false);
              }
            }
          />
          </Col>
          <Col xs={6} md={3}>
          <motion.input
            whileHover={{ scale: 1.2 }}
            type="image"
            width="90%"
            height="90%"
            className="persona"
            src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/hombre.jpg"
            value="hombre"
            onClick={
              (e) => {
                setTarget(e.target.value);
                setViewAlturaPeso(true);
                setViewTarget(false);
              }
            }
          />
          </Col>
        </Row>
        <input
          type="button"
          className="buttonFormLook"
          value="Anterior"
          onClick={() => {
            let log = estaLogueado()
            if (log) {
              setViewTarget(false);
              setViewQuien(true);
            } else {
              setViewTarget(false);
              setViewEmail(true);
            }
          }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <br />

      </motion.div>) : ""}


      {/* ALTURA Y PESO */}
      {viewAlturaPeso? (<motion.div
       initial={{ y: -1050, }}
       animate={{ fontSize: 60, y: 0 }}
       transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Introduce peso y altura</h2>
        <br />
        <br />
        <label className="textAlturaPeso">Peso (kg): &nbsp;</label>
        <motion.input
          className="textAlturaPeso"
          type="text"
          placeholder="Ej: 70"
          onChange={(e) => setAltura(e.target.value)}
        />
        <br />

        {viewAlertaPeso ? (
        <div><motion.p
          initial={{ x: -1000, color: "#e30b2c"}}
          animate={{ fontSize: 20, x: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Por favor, introduce tu peso</motion.p></div>
        ) : ""}

        <br />
        <label className="textAlturaPeso">Altura (cm): &nbsp;</label>
        <motion.input
          type="text"
          className="textAlturaPeso"
          placeholder="175"
          onChange={(e) => setPeso(e.target.value)}
        />   
         {viewAlertaAltura ? (
        <motion.p
          initial={{ x: -1000, color: "#e30b2c"}}
          animate={{ fontSize: 20, x: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Por favor, introduce tu altura</motion.p>) : ""}
        <br />
        <br />
        <input
          type="button"
          className="buttonFormLook"
          value="Anterior"
          onClick={() => {
            setViewTarget(true);
            setViewAlturaPeso(false)
          }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="button"
          className="buttonFormLook"
          value="Siguiente"
          onClick={() => {
            if (peso === "" && altura !== "") {
              setViewAlertaAltura(true)
            } else if (peso !== "" && altura === "") {
              setViewAlertaPeso(true)
            } else if (peso === "" && altura === "") {
              setViewAlertaAltura(true)
              setViewAlertaPeso(true)
            } else if (peso !== "" && altura !== "") {
              let pesoBien = pesoAlturaOk(peso)
              let alturaBien = pesoAlturaOk(altura)
              if (pesoBien && alturaBien) {
                setViewAlertaAltura(false)
                setViewAlertaPeso(false)
                setViewAlturaPeso(false);
                setViewTalla(true);
              } 
              if (pesoBien && alturaBien === false) {
                setViewAlertaAltura(false)
                setViewAlertaPeso(true)
              }
              if (pesoBien  === false && alturaBien) {
                setViewAlertaAltura(true)
                setViewAlertaPeso(false)
              }
              if (pesoBien === false && alturaBien === false) {
                setViewAlertaAltura(true)
                setViewAlertaPeso(true)
              }
            }
          }} />

      </motion.div>) : ""}


      {/* TALLA */}
      {viewTalla? (<div>
        <motion.div
        initial={{ y: -1050, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <h2>Elige tu talla</h2>
        <br />
        <motion.input
          animate={{ fontSize: 60 }}
          whileHover={{ scale: 1.1 }}
          className="buttonFormLook"
          type="button"
          value="S"
          onClick={
            (e) => {
              setTalla(e.target.value);
              setViewTalla(false);
              setViewColor(true);
            }
          }

        />
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        <motion.input

          animate={{ fontSize: 60 }}

          whileHover={{ scale: 1.1 }}
          className="buttonFormLook"
          type="button"
          value="M"
          onClick={
            (e) => {
              setTalla(e.target.value);
              setViewTalla(false);
              setViewColor(true);
            }
          }
        />
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;

        <motion.input

          animate={{ fontSize: 60 }}

          whileHover={{ scale: 1.1 }}
          className="buttonFormLook"
          type="button"
          value="L"
          onClick={
            (e) => {
              setTalla(e.target.value);
              setViewTalla(false);
              setViewColor(true);
            }
          }
        />
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;&nbsp;
        <motion.input
          whileHover={{ scale: 1.1 }}
          animate={{ fontSize: 60 }}


          className="buttonFormLook"
          type="button"
          value="XL"
          onClick={
            (e) => {
              setTalla(e.target.value);
              setViewTalla(false);
              setViewColor(true);
            }
          }
        />
        
      </motion.div>
      <br />
      <br />
      <motion.div
        initial={{ y: -1050, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
        <input
          type="button"
          className="buttonFormLook"
          value="Anterior"
          onClick={() => {
            setViewTalla(false);
            setViewAlturaPeso(true)
          }} />
        
      </motion.div>
      </div>
      
      ) : ""}
      {/* COLORES */}
      {viewColor? (<motion.div
        initial={{ y: -1050, }}
        animate={{ fontSize: 60, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Elige uno o dos colores</h2>
        <br />
        <br />
        <Checkbox.Group onChange={(e) => onChangeCheck(e)}>
          <Checkbox
            className="color"
            value="negro"
            id="negro"
            disabled={isDisabled("negro")}
          >
            <img
            alt="color Negro"
              width="18%"
              height="10%"
              src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/black.jpg"
            ></img>
          </Checkbox>
          &nbsp;&nbsp;
          <Checkbox
            className="color"
            value="azul"
            id="azul"
            disabled={isDisabled("azul")}
          >
            <img
              width="18%"
              height="10%"
              alt="color azul"
              src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/bluelight.jpg"
            ></img>
          </Checkbox>
          &nbsp;&nbsp; 
          <Checkbox
            className="color"
            value="verde"
            id="verde"
            disabled={isDisabled("verde")}
          >
            <img
              width="18%"
              height="10%"
              alt="color verde"
              src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/green.jpg"
            ></img>
          </Checkbox>
          &nbsp;&nbsp;
          <Checkbox
            className="color"
            value="blanco"
            id="blanco"
            disabled={isDisabled("blanco")}
          >
            <img
              width="18%"
              height="10%"
              alt="color blanco"
              src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/white.jpg"
            ></img>
          </Checkbox>
          &nbsp;&nbsp; 
          <Checkbox
            className="color"
            value="marron"
            id="marron"
            disabled={isDisabled("marron")}
          >
            <img
              width="18%"
              height="10%"
              alt="color marron"
              src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/brown.jpg"
            ></img>
          </Checkbox>
        </Checkbox.Group>
        <br />
        {viewAlertaColor ? (<motion.p
          initial={{ y: -1050, }}
          animate={{ fontSize: 60, y: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >Por favor, selecciona entre 1 o 2 colores</motion.p>) : ""}
          <br /> 
          <input
          type="button"
          className="buttonFormLook"
          value="Anterior"
          onClick={() => {
            let log = estaLogueado()
            if (log && quien === "myself") {
              setViewColor(false);
              setViewQuien(true);
            } else {
            setViewColor(false);
            setViewTalla(true);
            }
          }} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="button"
          className="buttonFormLook"
          value="Siguiente"
          onClick={() => {
            if (color === "") {
              setViewAlertaColor(true)
            } else {
              setViewAlertaColor(false)
              setViewColor(false);
              setViewEstilo(true);
            }
          }}
        />

      </motion.div>) : ""}
      {/* ESTILOS  */}
      {viewEstilo ? (<div><motion.div
        initial={{ y: "-80vw", x: 0 }}
        animate={{ fontSize: 60, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 155, delay: 0.5 }}
      >
        <br />
        <br />
        <br />
        <h2>Qué imagen define mejor tu estilo</h2>
        <br />
        <br />
        <Row>
        <Col xs={6} md={3}>
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="image"
          className="persona"
          width="90%"
          height="90%"
          src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/clas.jpg"
          value="classic"
          onClick={(e) => {setEstilo(e.target.value); setViewSubmit(true)}}
        />
        </Col>
          <Col xs={6} md={3}>
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="image"
          className="persona"
          width="90%"
          height="90%"
          src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/spor.jpg"
          value="sport"
          onClick={(e) => {setEstilo(e.target.value); setViewSubmit(true)}}
        />
        </Col>
        <Col xs={6} md={3}>
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="image"
          className="persona"
          width="90%"
          height="90%"
          src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/fas2.jpg"
          value="fashion"
          onClick={(e) => {setEstilo(e.target.value); setViewSubmit(true)}}
        />
        </Col>
        <Col xs={6} md={3}>
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="image"
          className="persona"
          width="90%"
          height="90%"
          src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/cas.jpg"
          value="casual"
          onClick={(e) => {setEstilo(e.target.value); setViewSubmit(true)}}
        />
        </Col>
        </Row>
        </motion.div>
        <motion.div
        initial={{ y: "-80vw", x: 0 }}
        animate={{ fontSize: 60, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 155, delay: 0.5 }}
      >
        <input
        type="button"
        className="buttonFormLook"
        value="Anterior"
        onClick={() => {
          setViewEstilo(false);
          setViewColor(true)
        }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        </motion.div>
        </div>
        
        ) : ""}
        {viewSubmit ? (<motion.div
        initial={{ y: "-80vw", x: 0 }}
        animate={{ fontSize: 60, x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 155, delay: 0.2 }}>
        <br />
        <br />
        <button className="buttonFormLook" onClick={searchData}>¡Quiero ver mi resultado!</button>
        </motion.div>) : ""}
      
   
    </div>
  );
};

export default RecogidaLook;
