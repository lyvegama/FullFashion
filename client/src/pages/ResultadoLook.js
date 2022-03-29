import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from "antd";
import {  Row,  Col } from 'react-bootstrap';
import { motion } from "framer-motion";
import axios from "axios";

function ResultadoLook() {

    const [cambios, setCambios] = useState("");
    const [viewAlertNoSeleccionado, setViewAlertNoSeleccionado] = useState(false);


    // el check 
    const onChangeCheck = (checkedValues) => {
        setCambios(checkedValues);
        // console.log(checkedValues);
    };

    // console.log(resultado)

    function confirmarCompra(producto1, producto2, producto3, producto4, producto5, producto6) {
        let compra = [producto1, producto2, producto3, producto4, producto5, producto6]
        localStorage.setItem("compra", JSON.stringify(compra))
        let infoUser = sessionStorage.getItem("infoUser")
        if (infoUser === null) {
            window.location.href = "http://localhost:3000/datoscompranologueado"
        } else {
            window.location.href = "http://localhost:3000/datoscompralogueado"
        }
    }


    const recogerCambios = () => {

        if (cambios !== "") {
            var contador = JSON.parse(localStorage.getItem("contadorCambios"));
            contador++;
            if (contador < 6) {

                for (let i = 0; i < resultado.todasPartesDeArriba.length; i++) {

                    if (cambios[0] === resultado.todasPartesDeArriba[i]._id) {
                        console.log(resultado.todasPartesDeArriba[i]._id)
                        resultado.todasPartesDeArriba.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))

                    }

                    if (cambios[1] === resultado.todasPartesDeArriba[i]._id) {
                        console.log(resultado.todasPartesDeArriba[i]._id)
                        resultado.todasPartesDeArriba.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))
                    }
                }

                for (let i = 0; i < resultado.todasPartesDeAbajo.length; i++) {
                    if (cambios[0] === resultado.todasPartesDeAbajo[i]._id) {
                        console.log(resultado.todasPartesDeAbajo[i]._id)
                        resultado.todasPartesDeAbajo.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))
                    }

                    if (cambios[1] === resultado.todasPartesDeAbajo[i]._id) {
                        console.log(resultado.todasPartesDeAbajo[i]._id)
                        resultado.todasPartesDeAbajo.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))
                    }
                }

                for (let i = 0; i < resultado.todosZapatos.length; i++) {
                    if (cambios[0] === resultado.todosZapatos[i]._id) {
                        console.log(resultado.todosZapatos[i]._id)
                        resultado.todosZapatos.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))
                    }

                    if (cambios[1] === resultado.todosZapatos[i]._id) {
                        console.log(resultado.todosZapatos[i]._id)
                        resultado.todosZapatos.splice(i, 1)
                        localStorage.setItem("resultado", JSON.stringify(resultado))
                        console.log(JSON.parse(localStorage.getItem("resultado")))
                    }
                }

                localStorage.setItem("contadorCambios", JSON.stringify(contador));
                window.location.href = "http://localhost:3000/resultadolook"
            } else {
                //Se le pone venta de baneado y se actualiza su estado de baneado a true
                let informaUser = JSON.parse(sessionStorage.getItem("infoUser"));
                axios.post("/banearuser", informaUser);
                window.location.href = "http://localhost:3000/baneado";

            }
        } else {
            setViewAlertNoSeleccionado(true);
        }
    }


    const isDisabled = (id) => {
        return cambios.length > 1 && cambios.indexOf(id) === -1;
    };


    if (localStorage.getItem("resultado")) {
        var resultado = JSON.parse(localStorage.getItem("resultado"))
        // console.log(resultado)
    } else {
        console.log("No hay datos en el local")
    }
    // 0
    var imagenArriba0 = resultado.todasPartesDeArriba[0].imgUrl
    // 1
    var imagenArriba1 = resultado.todasPartesDeArriba[1].imgUrl
    // 2
    var imagenArriba2 = resultado.todasPartesDeArriba[2].imgUrl
    // 3
    var imagenAbajo0 = resultado.todasPartesDeAbajo[0].imgUrl
    // 4
    var imagenAbajo1 = resultado.todasPartesDeAbajo[1].imgUrl
    // 5
    var imagenZapatos0 = resultado.todosZapatos[0].imgUrl

    var tituloArriba0 = resultado.todasPartesDeArriba[0].nombre
    var tituloArriba1 = resultado.todasPartesDeArriba[1].nombre
    var tituloArriba2 = resultado.todasPartesDeArriba[2].nombre

    var tituloAbajo0 = resultado.todasPartesDeAbajo[0].nombre
    var tituloAbajo1 = resultado.todasPartesDeAbajo[1].nombre

    var tituloZapatos0 = resultado.todosZapatos[0].nombre

    var idArriba0 = resultado.todasPartesDeArriba[0]._id
    var idArriba1 = resultado.todasPartesDeArriba[1]._id
    var idArriba2 = resultado.todasPartesDeArriba[2]._id

    var idAbajo0 = resultado.todasPartesDeAbajo[0]._id
    var idAbajo1 = resultado.todasPartesDeAbajo[1]._id

    var idZapatos0 = resultado.todosZapatos[0]._id
    var contador = JSON.parse(localStorage.getItem("contadorCambios"));

    return (

        <div className="card card-body">
            <Checkbox.Group className="resultadolook" onChange={(e) => onChangeCheck(e)}  >
                <Row>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" id={idArriba0} value={idArriba0} disabled={isDisabled(idArriba0)}>
                            <img alt="Foto de arriba Full Fashion" src={imagenArriba0} width={350} />
                            <label>{tituloArriba0}</label>
                        </Checkbox>
                        <br></br>
                    </Col>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" id={idArriba1} value={idArriba1} disabled={isDisabled(idArriba1)}>
                            <img alt="Foto de arriba Full Fashion" src={imagenArriba1} width={350} />
                            <label>{tituloArriba1}</label>
                        </Checkbox>
                    </Col>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" id={idArriba2} value={idArriba2} disabled={isDisabled(idArriba2)}>
                            <img alt="Foto de arriba Full Fashion" src={imagenArriba2} width={350} />
                            <label>{tituloArriba2}</label>
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" id={idAbajo0} value={idAbajo0} disabled={isDisabled(idAbajo0)}>
                            <img alt="Foto de abajo Full Fashion" src={imagenAbajo0} width={350} />
                            <label>{tituloAbajo0}</label>
                        </Checkbox>
                    </Col>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" id={idAbajo1} value={idAbajo1} disabled={isDisabled(idAbajo1)}>
                            <img alt="Foto de abajo Full Fashion" src={imagenAbajo1} width={350} />
                            <label>{tituloAbajo1}</label>
                        </Checkbox>
                    </Col>
                    <Col md={4} xs={12}>
                        <Checkbox className="color" value={idZapatos0} id={tituloZapatos0} disabled={isDisabled(idZapatos0)}>
                            <img alt="Foto de abajo Full Fashion" src={imagenZapatos0} width={350} />
                            <label>{tituloZapatos0}</label>
                        </Checkbox>
                    </Col >
                </Row>
                <br></br>
            </Checkbox.Group>
            <div>
                <button className="ButtonHome btn btn-primary btn-lg" variant="primary" onClick={recogerCambios}>Cambiar las seleccionadas</button>
                {viewAlertNoSeleccionado ? (<div><motion.p
                    initial={{ x: -1000, color: "#e30b2c" }}
                    animate={{ fontSize: 20, x: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>Debes seleccionar algun artículo para realizar el cambio</motion.p> </div>) : ""}
                <p>*Recuerda que solo tienes <b>{5 - contador}</b> cambios de 2 prendas máximo cada vez</p>
                <button className="ButtonHome btn btn-primary btn-lg" onClick={() => confirmarCompra(resultado.todasPartesDeArriba[0], resultado.todasPartesDeArriba[1], resultado.todasPartesDeArriba[2], resultado.todasPartesDeAbajo[0], resultado.todasPartesDeAbajo[1], resultado.todosZapatos[0])}>Seguir para finalizar compra</button>
            </div>

        </div>
    );
}

export default ResultadoLook;