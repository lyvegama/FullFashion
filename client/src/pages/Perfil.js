import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Button } from 'react-bootstrap';
import { motion } from "framer-motion"

function Perfil() {

    const [viewHistorial, setViewHistorial] = useState(false);
    const [viewModificarPerfil, setViewModificarPerfil] = useState(false);
    const [viewHistorialVacio, setViewHistorialVacio] = useState(false);
    const [pedidoVacio, setPedidoVacio] = useState("")

    //!Proceso para pintar los pedidos
    const [nombre, setNombre] = useState("");
    const [target, setTarget] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codigo, setCodigo] = useState("");
    const [poblacion, setPoblacion] = useState("");
    const [talla, setTalla] = useState("");


    const onChangeTalla = (selectedValues) => {
        setTalla(selectedValues);
    };

    const onChangeTarget = (selectedValues) => {
        setTarget(selectedValues);
    };

    let idUserLogueado = JSON.parse(sessionStorage.getItem("infoUser"));
    let idUser = {
        idUsuario: idUserLogueado.id_usuario
    }

    //! Cuando carga Perfil
    // Recoge todos los pedidos del usuario y lo mete en Storage para pintarlos mas abajo
    
    axios.post("/historial", idUser).then((res) => {
        if (res.data === "sinPedidos") {
            setPedidoVacio("vacio")
        } else {
            localStorage.setItem("pedidos", JSON.stringify(res.data));
            setPedidoVacio("")
        }
    })

    const verHistorial = () => {
        if (pedidoVacio === "vacio") {
            setViewHistorialVacio(true);
            setViewModificarPerfil(false)
        } else {
            setViewHistorial(true);
            setViewModificarPerfil(false);
        }
    }


    // //! BOTON Seleciona el pedido que se va hace la devolucion (El boton tiene la info en JSON de todo el pedido)
    const selectCompra = (datos) => {

        //Se mete TODA la info del pedido a devolver Storage
        localStorage.setItem('devolucion', datos);
        window.location.href = "http://localhost:3000/devolucion";

    }

    var allCompras = JSON.parse(localStorage.getItem("pedidos"));

    function updateProfile() {
        let logueado = JSON.parse(sessionStorage.getItem("infoUser"));
        let id = logueado.id_usuario
        let usuario = {
            nombre,
            apellidos,
            email,
            dni,
            direccion,
            cp: codigo,
            poblacion,
            talla,
            target,
            id
        }
        axios.post('/modifyprofile', usuario);
    }


    const sendEmailConfirmation = async () => {

        let logueado = JSON.parse(sessionStorage.getItem("infoUser"));

        localStorage.setItem(
            "user",
            JSON.stringify({
                email: logueado.email,
                idUsuario: logueado.id_usuario
            }));

        let data = JSON.parse(localStorage.getItem("user"));

        axios.post("/cambiarpass", data).then((res) => console.log("link enviado por email"));
    };

    return (
        <div className="perfil">
            <br />
            <div>
                <h2>Consulta tu historial de compra</h2>
                <button className="ButtonHome btn btn-primary btn-lg" onClick={verHistorial}>Historial</button>
                <br></br>
                {viewHistorialVacio ? (<motion.p
                    initial={{ x: -1000, color: "#e30b2c" }}
                    animate={{ fontSize: 20, x: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >No tienes pedidos que mostrar</motion.p>) : ""}
                <br />
                <h2>Modifica datos de tu perfil de usuario</h2>

                <button className="ButtonHome btn btn-primary btn-lg" onClick={() => { setViewModificarPerfil(true); setViewHistorial(false) }}>Modificar perfil</button>
                <br />

            </div>
            <br />
            {/* Vemos el historial de compras */}
            {viewHistorial ? (<div>

                {allCompras.map(compra => {
                    let fecha = compra.fecha_creacion.split("T");
                    let estado = compra.estado
                    let entrega = compra.modo_entrega
                    let direccion = compra.direccion
                    let codigo = compra.cp
                    let poblacion = compra.poblacion
                    let id = compra.id_pedido
                    let estilo = compra.productos[0].estilo
                    let target = compra.productos[0].target

                    //!    Meto el id_producto en cada producto (Importante)
                    for (let i = 0; i < compra.productos.length; i++) {
                        compra.productos[i].id_pedido = compra.id_pedido;
                    }
                    //Si compra estado ==="devuelto" --> no se pinta
                    return (<div>



                        {compra.estado !== "devuelto" ? (
                            <div className="card card-body">
                                <h5><p>Compra con numero de identificación: {id}</p></h5>
                                <Row >
                                    <Col className="card card-body" md={6} xs={12}>
                                        <h2>Tus productos</h2>
                                        <Row >
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[0].imgUrl} alt="producto1" width="40%"></img>
                                                <p>1. {compra.productos[0].nombre}</p>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[1].imgUrl} alt="producto1" width="40%"></img>
                                                <p>2. {compra.productos[1].nombre}</p>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[2].imgUrl} alt="producto1" width="40%"></img>
                                                <p>3. {compra.productos[2].nombre}</p>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[3].imgUrl} alt="producto1" width="40%"></img>
                                                <p>4. {compra.productos[3].nombre}</p>
                                            </Col>
                                        </Row >
                                        <Row>
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[4].imgUrl} alt="producto1" width="40%"></img>
                                                <p>5. {compra.productos[4].nombre}</p>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <img src={compra.productos[5].imgUrl} alt="producto1" width="40%"></img>
                                                <p>6. {compra.productos[5].nombre}</p>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col className="card card-body" md={6} xs={12}>
                                        <h2>Los detalles de tu pedido</h2>
                                        <h4>Fecha de compra</h4>
                                        <p>{fecha}</p>
                                        <h4>Estado del envío</h4>
                                        <p>{estado}</p>
                                        <h4>Modo de entrega</h4>
                                        <p>{entrega}</p>
                                        <h4>Dirección de entrega</h4>
                                        <p>{direccion}</p>
                                        <h4>Código postal</h4>
                                        <p>{codigo}</p>
                                        <h4>Población</h4>
                                        <p>{poblacion}</p>
                                        <h4>Filtro estilo</h4>
                                        <p>{estilo}</p>
                                        <h4>Filtro target</h4>
                                        <p>{target}</p>
                                    </Col>


                                </Row>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <button className="ButtonHome btn btn-primary btn-lg" value={JSON.stringify(compra.productos)} onClick={(e) => selectCompra(e.target.value)}>Devolver</button>
                                    </Col>
                                </Row>
                            </div>


                        ) : ""}
                    </div>

                    )
                })
                }

            </div>) : ""}

            {viewModificarPerfil ? (
                <div>
                    <form className="card card-body">
                        <h2>Modificar perfil</h2>
                        <div className="form-control">
                            <label>Nombre</label><br></br>
                            <input type="text" placeholder="Introduce nuevo nombre" onChange={(e) => setNombre(e.target.value)}></input><br></br>
                            <label>Apellidos</label><br></br>
                            <input type="text" placeholder="Introduce nuevos apellidos" onChange={(e) => setApellidos(e.target.value)}></input><br></br>
                            <label>E-mail</label><br></br>
                            <input type="text" placeholder="Introduce nuevo e-mail" onChange={(e) => setEmail(e.target.value)}></input><br></br>
                            <label>DNI</label><br></br>
                            <input type="text" placeholder="Introduce nuevo dni" onChange={(e) => setDni(e.target.value)}></input><br></br>
                            <label>Dirección</label><br></br>
                            <input type="text" placeholder="Introduce nueva dirección" onChange={(e) => setDireccion(e.target.value)}></input><br></br>
                            <label>Código postal</label><br></br>
                            <input type="text" placeholder="Introduce nuevo código postal" onChange={(e) => setCodigo(e.target.value)}></input><br></br>
                            <label>Población</label><br></br>
                            <input type="text" placeholder="Introduce nueva población" onChange={(e) => setPoblacion(e.target.value)}></input><br></br>
                            <label >Talla</label>
                            <br></br>
                            <select name="talla" onChange={(e) => onChangeTalla(e.target.value)}>
                                <option></option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <br></br>
                            <label >Target</label>
                            <br></br>
                            <select name="target" onChange={(e) => onChangeTarget(e.target.value)}>
                                <option></option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="niño">Niño</option>
                                <option value="niña">Niña</option>
                            </select>
                            <br></br>
                            <br></br>
                            <Button className="ButtonHome btn btn-primary btn-md" variant="primary" onClick={() => updateProfile()} >Modificar perfil</Button>
                            <br />
                        </div>
                    </form>
                    <br />
                    <form action="">
                        <button type="button" className="ButtonHome btn btn-primary btn-lg" onClick={sendEmailConfirmation}>Cambiar Contraseña</button>
                    </form>
                </div>) : ""
            }
        </div >

    )
}
export default Perfil;