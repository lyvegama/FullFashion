const mongoose = require("mongoose")
const Usuario = require("../models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const SECRET = "FULLFASION1$6&&"

const actionUsers = {

    registro: (req, res) => {
        register(req, res)

    },
    loguear: (req, res) => {
        login(req, res)
    },
    addEstilosFav: async (req, res) => {
        let filter = { id_usuario: req.body.id_usuario };
        let update = { color: req.body.color, estilo: req.body.estilo }
        let actualizacion = await Usuario.findOneAndUpdate(filter, update)
        res.send({ message: "Compra realizada correctamente" })
    },
    addSegundaDireccion: async (req, res) => {
        let filtro = { id_usuario: req.body.id_usuario };
        let cambio = { direccion2: req.body.direccion2, poblacion2: req.body.poblacion2, cp2: req.body.cp2 }
        let actu = await Usuario.findOneAndUpdate(filtro, cambio);
        res.send({ message: "Compra realizada correctamente" })
    },
    updateUser: (req, res) => {
        updateUser(req, res)
    },
    banearUser: async (req, res) => {
        console.log(req.body.id_usuario)
        console.log(req.body.baneado)
        let actu = await Usuario.findOneAndUpdate({ id_usuario: req.body.id_usuario }, { baneado: true });

    },
    /**
     * Recibe una petición de cambio de contraseña del usuario y le da un link para una página de actualizado
     * @param {object} req Recibe un id de usuario del usuario que ha hecho la petición de cambio de contraseña, que está logueado
     */
    cambiarPass: async (req, res) => {
        //let objectToSave = { status: false, email: "" };

        let idUsuario = req.body.idUsuario; //Pillarlo de la BD

        const payload = {
            user: req.body.email,
            id: idUsuario,
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: "15m" });


        const link = `http://localhost:3000/cambiarpass/${idUsuario}/${token}`;

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
            subject: "Cambio de contraseña usuario Full Fashion",
            text: `
        Buenos días,
        
        Hemos recibido una solicitud de cambio de contraseña para su cuenta en FullFashion.
        Pulse en el link para continuar con el proceso: 
        ${link}.
        
        Atentamente, 
        Equipo de seguridad de FullFashion`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado.")
            }
        })

    },

    /**
     * Verifica la identidad del usuario mediante el token que se le asigna cuando se registra para poder regenerarle la contraseña
     * @param {object} req - Recibe el token del usuario.
     */
    confirmUserGet: async (req, res) => {
        const { token } = req.params;

        try {
            jwt.verify(token, SECRET);
            console.log("Token Verificado")
        } catch (error) {
            console.log("Token ya no es válido")
        }
    },
/**
     * Coge la nueva pass que le hemos generado al usuario a partir de su petición de nueva contraseña, la comprueba y si todo es correcto, la inserta en su perfil en base de datos sustituyendo la anterior.
     * @param {object} req - Recibe el id del usuario.
     */
    insertarPassCambiada: async (req, res) => {

        let infoUsuario = await busquedaUsuarioIdUsuario(req.body.idUsuario);
        var mismoPass = await bcrypt.compare(req.body.antPassword, infoUsuario[0].password)
        if (mismoPass) {
            let passEnc = await bcrypt.hash(req.body.password, saltRounds);
            let usuario = await Usuario.findOneAndUpdate({ id_usuario: req.body.idUsuario }, { password: passEnc })
            console.log("contraseña actualizada")
            res.json("passCambiada")
        } else {
            res.json("errorPass")
        }
    }

}

/**
     * Genera un objeto que se utilizara para insertar un usuario en la base de datos, recogiendo los campos de un login y validando que están introducidos siguiendo los parametros que se piden
     * @param {object} req - La informacion que recibe del formulario de registro
     */
async function register(req, res) {

    //! ---- Variables de la información del registro -----
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const dni = req.body.dni
    const direccion = req.body.direccion;
    const cp = req.body.cp;
    const poblacion = req.body.poblacion;
    const password = req.body.password;
    const password2 = req.body.password2;
    const talla = req.body.talla;
    const target = req.body.target;

    //! Expresiones Regulares validaciones:
    var regExpDni = new RegExp(/^[0-9]{8}\-?[a-zA-Z]{1}/);
    var regExpName = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u); //agregado espacio para poner dos apellidos
    var regExpEmail = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
    var regExpPass = new RegExp(/^(?=\w*\d)(?=\w*[a-zA-Z])\S{6,10}$/);
    var regExpCp = new RegExp(/^\d{5}$/);
    var regExpDir = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\d ]+$/u) //agregado números y el espacio para poner en la dirección

    //! Zona de validaciones

    const nombreOk = regExpName.test(nombre);
    const apellidosOk = regExpName.test(apellidos);
    const emailOk = regExpEmail.test(email);
    const poblacionOk = regExpDir.test(poblacion);
    const passOk = regExpPass.test(password);
    const pass2Ok = regExpPass.test(password2);
    const mismoPassOk = password == password2;
    const dniOk = regExpDni.test(dni) && validation_dni(dni);
    const cpOk = regExpCp.test(cp);
    const dirOk = regExpDir.test(direccion)

    var ok = nombreOk && apellidosOk && emailOk && passOk && dniOk && pass2Ok && mismoPassOk && cpOk && poblacionOk && dirOk;


    // //! ---- SI TODAS VALIDACIONES TRUE --------
    if (ok) {
        const existeEmail = await busquedaUsuarioEmail(email);

        if ((existeEmail[0]) == null) {
            var passEnc = "";
            passEnc = await bcrypt.hash(password, saltRounds);
            let inserta = await insertarUsuario(nombre, apellidos, email, dni, passEnc, direccion, cp, poblacion, talla, target, res);
            console.log("registrado correctamente")
            res.json("insertOk")
        } else {
            res.json("usuarioExiste");
        }
    } else {
        if (!mismoPassOk) {
            res.json("errorPassIgual")
        }
        else if (!emailOk) {
            res.json("errorEmail")
        }
        else if (!passOk) {
            res.json("errorPassReq")
        }
        else if (!dniOk) {
            res.json("errorDni")
        }
        else {
            res.json("error")
        }
    }
}
/**
     * Inserta el objeto que genera el login en la base de datos
     * @param {string} nombre - La informacion que recibe del formulario de registro
     * @param {string} apellidos - La informacion que recibe del formulario de registro
     * @param {string} email - La informacion que recibe del formulario de registro
     * @param {string} dni - La informacion que recibe del formulario de registro
     * @param {string} password - La informacion que recibe del formulario de registro
     * @param {string} direccion - La informacion que recibe del formulario de registro
     * @param {string} cp - La informacion que recibe del formulario de registro
     * @param {string} poblacion - La informacion que recibe del formulario de registro
     * @param {string} talla - La informacion que recibe del formulario de registro
     * @param {string} target - La informacion que recibe del formulario de registro
     */
async function insertarUsuario(nombre, apellidos, email, dni, password, direccion, cp, poblacion, talla, target) {
    dni = dni.replace("-", "");
    dni = dni.toUpperCase();
    let usuario = {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        dni: dni,
        password: password,
        direccion: direccion,
        cp: cp,
        poblacion: poblacion,
        direccion2: "",
        poblacion2: "",
        cp2: "",
        talla: talla,
        target: target,
        color: "",
        estilo: "",
        compras: [],
        baneado: false,
        admin: false
    };

    let nuevoUsuario = new Usuario(usuario);

    nuevoUsuario.save(function (err) {
        if (err) throw err;
        console.log(`Inserción correcta del Usuario ${nombre}`);

    });
}

/**
     * Valida que el dni introducido por el usuario es real, utilizando el algoritmo de la policía
     * @param {string} dni - La informacion que recibe del formulario de registro
     * @return {string} letra - Devuelve la letra que correspondería según el algoritmo policial al número de dni introducido para comprobar si es correcto.
     */

function validationFormat(dni) {
    dni = dni.toUpperCase();
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var nums = parseInt(dni.substring(0, dni.length - 1));
    var letra = letras[nums % letras.length]; // [nums % letras.length] = posicion de la letra del array de la policia
    return letra == dni[8];
}
/**
     * Deja el dni con el formato que necesitamos para nuestra base de datos
     * @param {string} dni - La informacion que recibe del formulario de registro
     * @return {string} conGuion - Devuelve el dni que nos ha introducido el usuario sin el guion, si lo tuviera, para que tenga el formato que necesitamos.
     */

function quitarGuion(dni) {
    var conGuion = dni.split("-");
    if (conGuion.length == 1) {
        return dni;
    } else {
        return conGuion[0] + conGuion[1];
    }
}
/**
     * Recoge el dni sin guion que hemos generado en la funciónm quitar guion y da ese valor a la variable dni que utilizaremos para el registro.
     * @param {string} dni - La informacion que recibe del dni sin guion de la función quitar guion
     * @return {string} dhi - Devuelve la variable dni con el nuevo valor asignado
     */

function validation_dni(dni) {
    dni = quitarGuion(dni);
    return validationFormat(dni);
}


/**
     * Comprueba que el mail y el password introducidos estén en la base de datos para loguear al usuario
     * @param {object} req - Recibe el password y el mail que inserta el usuario en el registro.
     */
async function login(req, res) {

    //! ---- Variables de la información del registro -----

    let email = req.body.email;
    let password = req.body.password;
    let existeEmailBD = await busquedaUsuarioEmail(email);

    if ((existeEmailBD[0]) == undefined) {
        console.log("usuario no existe en la BD");
        res.json("userNoExiste")
    } else {
        var mismoPass = await bcrypt.compare(password, existeEmailBD[0].password)     // <-- COMPARA LAS 2 PASSWORDS
        if (mismoPass) {
            if (existeEmailBD[0].admin) {
                console.log("es admin")
                let infoUser = saveSesion(existeEmailBD[0]);
                res.json(infoUser)
            } else {
                console.log("no es admin")
                let infoUser = saveSesion(existeEmailBD[0]);
                res.json(infoUser)
            }
        } else {
            console.log("contraseña incorrecta")
            res.json("passwordMal")

        }
    }

}
/**
     * Busca un usuario en la base de datos por id y nos devuelve su información de existir.
     * @param {string} idUsuario - REcibe el id del usuario
     * @return {object} datos - Devuelve su información completa en forma de objeto
     */
async function busquedaUsuarioIdUsuario(idUsuario) {
    let datos = await Usuario.find({ id_usuario: idUsuario });
    return datos;
}
/**
     * Busca un usuario en la base de datos por mail y nos devuelve su información de existir.
     * @param {string} idUsuario - REcibe el mail del usuario
     * @return {object} datos - Devuelve su información completa en forma de objeto
     */
async function busquedaUsuarioEmail(email) {
    let datos = await Usuario.find({ email: email });
    return datos;
}

/**
     * Genera un objeto para introducirlo en sesion storage cuando un usuario se loguea, para indicar que su sesión está en marcha
     * @param {object} datosUser - Recibe todos los datos del usuario
     * @return {object} user - Devuelve el objeto con todos los datos del usuario que se insertará en el session storage
     */

function saveSesion(datosUser) {
    let user = {
        id_usuario: datosUser.id_usuario,
        nombre: datosUser.nombre,
        apellidos: datosUser.apellidos,
        email: datosUser.email,
        dni: datosUser.dni,
        direccion: datosUser.direccion,
        cp: datosUser.cp,
        poblacion: datosUser.poblacion,
        talla: datosUser.talla,
        target: datosUser.target,
        color: datosUser.color,
        estilo: datosUser.estilo,
        admin: datosUser.admin,
        baneado: datosUser.baneado
    }
    return user;
}
/**
     * Actualiza la información del usuario en la base de datos tras rellenar este el formularioo de petición
     * @param {object} req - Recibe un objeto con todos los cambios de su perfil que quiere hacer el usuario y que se actualizarán en la base de datos
     */
async function updateUser(req, res) {
    let { nombre, apellidos, email, dni, password, direccion, cp, poblacion, talla, target, id } = req.body
    // let logueado = sessionStorage.getItem("infoUser")

    let passEnc = "";
    passEnc = await bcrypt.hash(password, saltRounds);

    Usuario.find({ id_usuario: id }, function (err, user) {
        if (err) throw err;
        if (nombre != "") { user[0].nombre = nombre; }
        if (apellidos != "") { user[0].apellidos = apellidos; }
        if (email != "") { user[0].email = email; }
        if (dni != "") { user[0].dni = dni; }
        if (password != "") { user[0].password = passEnc; }
        if (direccion != "") { user[0].direccion = direccion; }
        if (cp != "") { user[0].cp = cp; }
        if (poblacion != "") { user[0].poblacion = poblacion; }
        if (talla != "") { user[0].talla = talla; }
        if (target != "") { user[0].target = target; }
        user[0].save(function (err) {
            if (err) throw err;
            console.log("Actualización correcta");
        });
        res.send("Usuario actualizado")
    });

}


module.exports = actionUsers //revisar el nombre para importarlo en las rutas