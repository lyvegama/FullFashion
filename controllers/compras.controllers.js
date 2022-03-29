const Stripe = require("stripe")
const Pedido = require('../models/compraModel')
const mongoose = require("mongoose")
const stripe = new Stripe("sk_test_51KWzYqAT2Dvvoq4FP3inAGTdnEcI6cQ0lepOWuW8ExJUbOGkvCVqzNx2Cc82Q4xOTw0hUaGeb0algovVt3gI6fSB00NfBV2hGR")
const nodemailer = require("nodemailer")
const { ConsoleMessage } = require("puppeteer")


const actionCompras = {

/**
     * Procesa un pago y guarda la información de la compra tanto en la base de stripe como en la de mongo
     * @constructor
     * @param {object} req - La informacion la recibe parte del formulario de pago, parte del storage donde se encuentra alojada la información del pedido
     */

    pago: async (req, res) => {

        const { id, amount, id_usuario, productos, estado, fecha_creacion, modo_entrega, direccion, cp, poblacion, devolucion, filtros } = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "EUR",
            description: "Pack full fashion",
            payment_method: id,
            confirm: true

        })

        const compraToSave = new Pedido({
            id_usuario,
            productos,
            estado,
            fecha_creacion,
            modo_entrega,
            direccion,
            cp,
            poblacion,
            devolucion,
            filtros
        })
        compraToSave.save()
        res.send({ message: "Compra realizada correctamente" })
    },
    /**
     * Busca los pedidos de un usuario
     * @constructor
     * @param {object} req - Recibe un id de usuario con el que realiza la búsqueda de todas las compras
     */
    buscarCompras: async (req, res) => {
        var busquedaPedidos = await Pedido.find({ id_usuario: req.body.idUsuario })
        if (busquedaPedidos.length === 0) {
            res.json("sinPedidos")
        } else {
            res.json(busquedaPedidos)
        }
        


    },

/**
     * Actualiza un pedido cuando se pide una devolución
     * @constructor
     * @param {object} req - La informacion que recibe el id del pedido en el que se ha pedido devolución desde el perfil para modificarlo y actualizarlo
     */

    actualizarPedido: async (req, res) => {
       
        const datosCambio = { productos: req.body };
        var actualizarPedido = await Pedido.findOneAndUpdate({ id_pedido: req.body[0].id_pedido }, datosCambio)
        // var actualizarPedido = await Pedido.findOneAndUpdate({id_pedido: req.body.id_pedido}, {devolucion:true})
        res.json("actualizadoPedido");

    },
    /**
     * Actualiza un pedido cambiando su estado a devuelto para que desaparezca del historial
     * @constructor
     * @param {object} req - La informacion que recibe el id del pedido de la función anterior para cambiar su estado a devuelto
     */
    quitarPedido: async (req, res) => {
      
        //Si pedido devolucion es true, cambia el estado a devuelto: los pedidos en histroail devueltos no se veran.
        var devueltaPedido = await Pedido.findOneAndUpdate({ id_pedido: req.body.id_pedido }, { estado: "devuelto" })
        res.json("quitarPedido")

    },
    /**
     * Actualiza un pedido cambiando devolución a true para indicar que el nuevo pedido que se genera tras el cambio de la función quitarPedido es producto de una devolución.
     * @constructor
     * @param {object} req - La informacion que recibe el id del pedido de la función anterior para cambiar su estado a devolución: true.
     */
    devolucionPrimera:async (req, res) => {
       
        var actualizarPedido = await Pedido.findOneAndUpdate({id_pedido: req.body[0].id_pedido}, {devolucion:true})
        res.json("devolucionPrimera");

    },
 /**
     * Manda por mail la factura de la compra al usuario
     * @constructor
     * @param {object} req - En el req.body recibe toda la información del cliente que ha finalizado una compra y que se guarda en el storage: mail, nombre, dirección, población, código postal, fecha de compra, modo de envío, producto, y precio.
     */

    enviarMail: async (req, res) => {
     
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, //true para el puerto 465, false para otros puertos
            auth: {
                user: 'fullfashion211@gmail.com',
                pass: 'aoenowzavvtthpzf' //password generado con password application de Google
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'Full Fashion <fullfashion211@gmail.com>',
            to: `${req.body.email}`,
            subject: "Factura de Full Fashion",
            text: "¡Hola! Gracias por comprar en Full Fashion. Aquí tienes la factura que nos has pedido de tu compra. Gracias por confiar en nosotros.",

            html: `<div><img src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesHome/Logo2.png" width=100px height=100px /><br /><p>Full Fashion S.A</p><p>Calle Mongo, Madrid, 95959</p><p>fullfashion211@gmail.com</p><hr size="10" width="300%" align="left" color="grey"></hr>    <p><b>Nombre del cliente:</b> ${req.body.nombre}</p><p><b>Direccion de envío:</b> ${req.body.direccion}</p><p><b>Población de envío:</b> ${req.body.poblacion}</p><p>${req.body.cp}</p><div className="container"><p align="justify"><b>Fecha y hora de la compra: </b>${req.body.fechaCompra}</p><p align="justify"><b>Modo de envío:</b> ${req.body.modoEnvio}</p></div><table className="table"><thead><tr><th>Productos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Cantidad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Precio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th></tr></thead><tbody><tr><td>${req.body.producto}</td><td>1</td><td>${req.body.precio}</td></tr></tbody></table><div><div><p align="justify">Gracias por tu compra, estamos felices de ser partícipes de tu nuevo look. El envío puede demorarse entre 3 y 5 días laborables si has elegido correo ordinario y punto de recogida; y 24h si has elegido correo certificado. Según nuestras políticas de devoluciones* dispones de 2 cambios después de realizar la compra, el primero puedes elegir hasta un máximo de 3 prendas y si todavía no te convence no te preocupes, puedes devolvernos todo el pack completo, los gastos de envío y devoluciones va incluido en el precio final de compra. Dispones de 30 días para realizar dicho cambio.</p><br /><p align="justify">*Políticas de devoluciones de Full Fashion: Si deseas realizar la devolución de un artículo comprado en FullFashion.com, dispones de 30 días desde la fecha de envío de tu pedido.Los artículos deben conservar todas las etiquetas y estar en perfecto estado. Puedes encontrar más información acerca de la Política de Cambios y Devoluciones o del derecho de desistimiento en la Ley 7/1996, de 15 de enero de 1996, de Ordenación del Comercio Minorista (Boletín Oficial del Estado nº 15, de 17 de enero de 1996).</p></div></div></div >`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado.")
            }
        })
        


    },





}




module.exports = actionCompras