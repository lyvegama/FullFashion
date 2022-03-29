// Creación del producto
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const objetoUserSchema = {
    nombre: String,
    apellidos: String,
    email: String,
    dni: String,
    password: String,
    direccion: String,
    cp: String,
    poblacion: String,
    direccion2: String,
    poblacion2: String,
    cp2: String,
    talla: String,
    target: String,
    color: Array,
    estilo: String,
    compras: Array,
    baneado: Boolean,
    admin: Boolean
};

const userSchema = mongoose.Schema(objetoUserSchema, {versionKey: false})

userSchema.plugin(AutoIncrement, {inc_field: 'id_usuario'});

const Usuario = mongoose.model("usuarios", userSchema);


// para exportar
module.exports = Usuario;