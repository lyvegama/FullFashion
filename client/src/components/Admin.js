import axios from "axios";
import { Button, Row, Col } from 'react-bootstrap';
import React, { useState } from "react";

function Admin() {
    
    const [nombre, setNombre] = useState("");
    const [target, setTarget] = useState("");
    const [tipo, setTipo] = useState("");
    const [estilo, setEstilo] = useState("");
    const [color, setColor] = useState("");
    const [imagen, setImagen] = useState("");
    const [id, setId] = useState("");
    
    function addProduct() {
    
        let producto = {
            nombre,
            target,
            tipo,
            estilo,
            color,
            imagen
        }
        axios.post('/addproduct', producto);
        console.log(producto);
    }

    function deleteP() {
        let producto = {
            id,
        }
        axios.post('/deleteproduct', producto);
        console.log(producto)
    }

    function modifyProduct() {
        let producto = {
            nombre,
            target,
            tipo,
            estilo,
            color,
            imagen,
            id,
        }
        axios.post('/modifyproduct', producto);
        console.log(producto);
    }
    
    return (
        <div>
            <Row>
                <Col md={4} xs={12}>
            <form className="card card-body">
                <h2>Añadir prenda</h2>
                <div className="form-control">
                    <label>Nombre</label><br></br>
                    <input type="text" id="addname" placeholder="Introduce nombre" onChange={(e) => setNombre(e.target.value)}></input><br></br>
                    <label>Target</label><br></br>
                    <input type="text" id="addtarget" placeholder="Introduce target" onChange={(e) => setTarget(e.target.value)}></input><br></br>
                    <label>Tipo de prenda</label><br></br>
                    <input type="text" id="addtype" placeholder="Introduce tipo" onChange={(e) => setTipo(e.target.value)}></input><br></br>
                    <label>Estilo</label><br></br>
                    <input type="text" id="addstyle" placeholder="Introduce estilo" onChange={(e) => setEstilo(e.target.value)}></input><br></br>
                    <label>Color</label><br></br>
                    <input type="text" id="addcolor" placeholder="Introduce color" onChange={(e) => setColor(e.target.value)}></input><br></br>
                    <label>Imagen</label><br></br>
                    <input type="text" id="addurl" placeholder="Introduce url" onChange={(e) => setImagen(e.target.value)}></input><br></br>
                    <br></br>
                    <Button className="ButtonHome btn btn-primary btn-sm" variant="primary" type="button" onClick={() => addProduct()}>Añadir producto</Button>
                </div>
            </form>
            </Col>

            <Col md={4} xs={12}>
            <form className="card card-body">
                <h2>Modificar producto</h2>
                <div className="form-control">
                    <label>Introduzca id producto a modificar</label><br></br>
                    <input type="number" id="productomodificar" onChange={(e) => setId(e.target.value)}></input><br></br>
                    <p>Introduzca el o los nuevos valores a modificar</p>
                    <label>Nombre</label><br></br>
                    <input type="text" id="modificarnombre" placeholder="Introduce nuevo nombre" onChange={(e) => setNombre(e.target.value)}></input><br></br>
                    <label>Target</label><br></br>
                    <input type="text" id="modificartarget" placeholder="Introduce nuevo target" onChange={(e) => setTarget(e.target.value)}></input><br></br>
                    <label>Tipo de prenda</label><br></br>
                    <input type="text" id="modificartipo" placeholder="Introduce nuevo tipo" onChange={(e) => setTipo(e.target.value)}></input><br></br>
                    <label>Estilo</label><br></br>
                    <input type="text" id="modificarestilo" placeholder="Introduce nuevo estilo" onChange={(e) => setEstilo(e.target.value)}></input><br></br>
                    <label>Color</label><br></br>
                    <input type="text" id="modificarcolor" placeholder="Introduce nuevo color" onChange={(e) => setColor(e.target.value)}></input><br></br>
                    <label>Imagen</label><br></br>
                    <input type="text" id="modificarimg" placeholder="Introduce nueva url" onChange={(e) => setImagen(e.target.value)}></input><br></br>
                    <Button className="ButtonHome btn btn-primary btn-sm" variant="primary" onClick={() => modifyProduct()} >Modificar producto</Button>
                </div>
            </form>
            </Col>
            <Col md={4}  xs={12}>
            <form className="card card-body">
                <h2>Eliminar producto</h2>
                <div className="form-control">
                    <label>Producto a eliminar</label><br></br>
                    <input type="number" id="eliminarprod" placeholder="Introduce id de producto" onChange={(e) => setId(e.target.value)} ></input><br></br>
                    <Button className="ButtonHome btn btn-primary btn-sm" variant="primary" onClick={() => deleteP()}>Borrar producto</Button>
                </div>
            </form>
            </Col>
            </Row>
        </div>

)
}
export default Admin;