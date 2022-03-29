import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Container, Col  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {motion } from "framer-motion";



class Home extends Component {
   
    render() {
        return (
            <Container fluid>
            <Row className="Mainhead">
                <Col>
                <img className="img-fluid rounded mx-auto d-block" alt="Foto de home 1 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/alireza-dolati-OVS3rqXq9gg-unsplash.jpg"/>
                </Col>
                <Col className="centertext" xs={12} md={8}>
                <h1>Tu estilo <br/>a <br/>medida</h1>
                <ul className="list-unstyled">
                    <li>Nuestra inteligencia artificial selecciona 6 prendas a tu medida.</li>
                    <li>Realiza hasta 10 cambios antes de confirmar tu nuevo look.</li>
                    <li>Envío y devolución gratuita.</li>
                    <br/>
                    <Link to="/recogidalook"><motion.button 

                    whileHover={{scale:1.1}} className="ButtonComienzo btn btn-primary btn-lg" variant="primary" type="submit">Comienza tu look</motion.button></Link>

                </ul>
                </Col>
            </Row>
            <div>
                <h2 style={{fontSize: 50}}>Tu nuevo estilo <br/>en cuestión de minutos</h2>
                <Row className="nuevoestilo">
                <Col xs={12} md={4} >
                <img className="img-fluid rounded mx-auto d-block" alt="Foto de home 2 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/mohammed-hassan-fdCvrdYUJsY-unsplash.jpg"/>
                <h3>Cuéntanos tus gustos</h3>
                <p>Un test rápido nos servirá para elegir la ropa que mejor se adapte a tus gustos y necesidades.</p>
                </Col>
                <Col xs={12} md={4} >
                <img className="img-fluid rounded mx-auto d-block" alt="Foto de home 3 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/austin-wade-d2s8NQ6WD24-unsplash.jpg"/>
                <h3>Ajusta nuestra selección</h3>
                <p>Te ofrecemos la posibilidad de hacer hasta diez cambios del look que te ofrezcamos.</p>
                </Col>
                <Col xs={12} md={4}>
                <img className="img-fluid rounded mx-auto d-block" alt="Foto de home 4 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg"/>
                <h3>Regala un nuevo look</h3>
                <p>Full fashion también es un regalo. Selecciona para otra persona en el formulario y ¡la sorprenderás!</p>
                </Col>
                </Row>
            </div>
            <Row className="Homerecibir">
                <Col className="centertext" xs={12} md={8}>
                <h2>¿Qué recibiré en un envío de Full Fashion?</h2>
                <ul className="list-unstyled">
                    <li>Un look íntegro compuesto por seis piezas.</li>
                    <li>El look incluirá siempre como mínimo una parte de arriba, una parte de abajo y unos zapatos.</li>
                    <li>No necesitas ni quedartelo ni devolverlo al completo: devuelve solo lo que necesites.</li>
                </ul>
                </Col>
                <Col>
                <img width="400" height="200" className="img-fluid rounded mx-auto d-block" alt="Foto de home 5 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/visual-stories-micheile-FpPcoOAk5PI-unsplash.jpg"/>
                </Col>
            </Row>
            <div className="coste">
            <h2 style={{fontSize: 60}}>Suena bien pero, ¿cuánto me va a costar?</h2>
            <Row>
                <Col xs={12} md={6}>
                <h3>Primeras marcas al mejor precio</h3>
                <p>Recibe un look de 6 piezas de primeras marcas por tan solo 300 euros.</p>
                </Col>
                <Col xs={12} md={6}>
                <h3>Asesoramiento gratuito</h3>
                <p>Solo te cobramos la ropa, el servicio de personal shopper es un regalo de Full Fashion.</p>
                </Col>
            </Row>
            <Link to="/recogidalook"><Button className="ButtonComienzo btn btn-primary btn-lg" variant="primary" type="submit">Consigue tu look</Button></Link>
            </div>
            <Row><img with="100%" height="50%" className="img-fluid rounded mx-auto d-block" alt="Foto de home 8 Full Fashion" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/foto footer.png"/>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <br />
            </Container>
            
        );
    }
}
export default Home;
