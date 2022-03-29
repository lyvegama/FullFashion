import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
const stripePromise = loadStripe("pk_test_51KWzYqAT2Dvvoq4F6fndpOuyBZxYQajiWG0oTQJhietLyWxRuPtKzkPpoSh9B4yr2lyymteUUIH91QWLN5GsTfIP006FEL6O2E")



const ChekoutForm = () => {

    const [viewPrecioNiño, setViewPrecioNiño] = useState(false);
    const [viewPrecioAdulto, setViewPrecioAdulto] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    let filtrosCompra = JSON.parse(localStorage.getItem("filtrosCompra"));


    useEffect(() => {
        if (filtrosCompra.target === "niño" || filtrosCompra.target === "niña") {
            setViewPrecioNiño(true)
        } else if (filtrosCompra.target === "hombre" || filtrosCompra.target === "mujer") {
            setViewPrecioAdulto(true)
        }
    }, [filtrosCompra.target])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let infoUser = JSON.parse(sessionStorage.getItem("infoUser"));
        let comprado = JSON.parse(localStorage.getItem("compra"));
        let direccionEnvio = JSON.parse(localStorage.getItem("direccionEnvio"));
        let infoUserNoLog = JSON.parse(localStorage.getItem("datosNoLog"));
        let filtrosCompra = JSON.parse(localStorage.getItem("filtrosCompra"));



        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })



        // SI ESTA LOGUEADO:
        if (!error && infoUser !== null && infoUserNoLog === null) {
            const { id } = paymentMethod;

            // GUARDA EL PEDIDO: 
            await axios.post('/checkout', {
                id,
                amount: 30000,
                id_usuario: infoUser.id_usuario,
                productos: comprado,
                estado: "En preparación",
                fecha_creacion: new Date().toString(),
                modo_entrega: direccionEnvio.modoEnvio,
                direccion: direccionEnvio.direccion,
                cp: direccionEnvio.cp,
                poblacion: direccionEnvio.poblacion,
                devolucion: false,
                filtros: filtrosCompra

            })

            // GUARDA ESTILOS FAVORITOS
            await axios.post("/estilosfavoritos", {
                id_usuario: infoUser.id_usuario,
                color: filtrosCompra.color,
                estilo: filtrosCompra.estilo,
            })


            // GUARDA SEGUNDA DIRECCION USUARIO
            if (!direccionEnvio.mismaDireccion) {
                await axios.post("/direcciondos", {
                    id_usuario: infoUser.id_usuario,
                    direccion2: direccionEnvio.direccion,
                    poblacion2: direccionEnvio.poblacion,
                    cp2: direccionEnvio.cp,

                })

            }

            // DATOS PARA LA FACTURA:
            //  datosFactura {nombre, modoEnvio, direccion, poblacion, cp,  fechaCompra, producto, precio}
            // Si está logueado y es para niño/niña
            if (filtrosCompra.target === "niño" || filtrosCompra.target === "niña") {
                let datosFactura = {
                    nombre: infoUser.nombre + " " + infoUser.apellidos,
                    email: infoUser.email,
                    modoEnvio: direccionEnvio.modoEnvio,
                    direccion: direccionEnvio.direccion,
                    poblacion: direccionEnvio.poblacion,
                    cp: direccionEnvio.cp,
                    fechaCompra: new Date().toString(),
                    producto: "Kit FullFashion Niñ@",
                    precio: "250 €"
                }
                sessionStorage.setItem("datosFactura", JSON.stringify(datosFactura))
            }
            if (filtrosCompra.target === "hombre" || filtrosCompra.target === "mujer") {
                let datosFactura = {
                    nombre: infoUser.nombre + " " + infoUser.apellidos,
                    email: infoUser.email,
                    modoEnvio: direccionEnvio.modoEnvio,
                    direccion: direccionEnvio.direccion,
                    poblacion: direccionEnvio.poblacion,
                    cp: direccionEnvio.cp,
                    fechaCompra: new Date().toString(),
                    producto: "Kit FullFashion Adulto",
                    precio: "300 €"
                }
                sessionStorage.setItem("datosFactura", JSON.stringify(datosFactura))
            }


            elements.getElement(CardElement).clear();

        }

        // SI NO ESTÁ LOGUEADO:
        if (!error && infoUserNoLog !== null && infoUser === null) {
            const { id } = paymentMethod;
            await axios.post('/checkout', {
                id,
                amount: 30000,
                id_usuario: infoUserNoLog.dni,
                productos: comprado,
                estado: "En preparación",
                fecha_creacion: new Date(),
                modo_entrega: infoUserNoLog.modoEnvio,
                direccion: infoUserNoLog.direccion,
                nombreLeroy: infoUserNoLog.nombreLeroy,
                cp: infoUserNoLog.cp,
                poblacion: infoUserNoLog.poblacion,
                devolucion: false,
            })
            elements.getElement(CardElement).clear();

            // DATOS FACTURA PARA COMPRA DE NIÑO NO LOGUEADO
            if (filtrosCompra.target === "niño" || filtrosCompra.target === "niña") {
                let datosFactura = {
                    nombre: infoUserNoLog.nombre + " " + infoUserNoLog.apellidos,
                    email: infoUserNoLog.email,
                    modoEnvio: infoUserNoLog.modoEnvio,
                    direccion: infoUserNoLog.direccion,
                    poblacion: infoUserNoLog.poblacion,
                    cp: infoUserNoLog.cp,
                    fechaCompra: new Date().toString(),
                    producto: "Kit FullFashion Niñ@",
                    precio: "250 €"
                }
                sessionStorage.setItem("datosFactura", JSON.stringify(datosFactura))
            }

            // DATOS FACTURA PARA COMPRA DE ADULTO NO LOGUEADO
            if (filtrosCompra.target === "hombre" || filtrosCompra.target === "mujer") {
                let datosFactura = {
                    nombre: infoUserNoLog.nombre + " " + infoUserNoLog.apellidos,
                    email: infoUserNoLog.email,
                    modoEnvio: infoUserNoLog.modoEnvio,
                    direccion: infoUserNoLog.direccion,
                    poblacion: infoUserNoLog.poblacion,
                    cp: infoUserNoLog.cp,
                    fechaCompra: new Date().toString(),
                    producto: "Kit FullFashion Adulto",
                    precio: "300 €"
                }
                sessionStorage.setItem("datosFactura", JSON.stringify(datosFactura))
            }


        }


        localStorage.removeItem("direccionEnvio")
        localStorage.removeItem("quien")
        localStorage.removeItem("compra")
        localStorage.removeItem("datosNoLog")
        localStorage.removeItem("resultado")
        localStorage.removeItem("colorEstilo")
        localStorage.removeItem("filtrosCompra")
        localStorage.removeItem("contadorCambios")

        window.location.href = "http://localhost:3000/mostrarfactura"


    }

    let compra = JSON.parse(localStorage.getItem("compra"));

    return (
        <form onSubmit={handleSubmit} className="card card-body">
            <Row>
                <Col>
                    <img src={compra[0].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
                <Col>
                    <img src={compra[1].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
                <Col>
                    <img src={compra[2].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={compra[3].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
                <Col>
                    <img src={compra[4].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
                <Col>
                    <img src={compra[5].imgUrl} alt="Checkout" className="img-fluid" />
                </Col>
            </Row>

            <div className="form-group">
                {viewPrecioAdulto ? (<h3 className="text-center">Total: 300€</h3>) : ""}
                {viewPrecioNiño ? (<h3 className="text-center">Total: 250€</h3>) : ""}
                <CardElement className="form-control" />
            </div>
            <button className="ButtonHome btn btn-primary btn-lg">
                PAGAR
            </button>
        </form>
    )

}



function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <ChekoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}

export default Payment;