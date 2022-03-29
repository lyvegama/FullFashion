const mongoose = require("mongoose");

const objetoLeroySchema = {
    nombre: String,
    direccion: String,
    latitud: Number,
    longitud: Number
};

const leroySchema = mongoose.Schema(objetoLeroySchema, { versionKey: false })

const Leroy = mongoose.model("leroy", leroySchema);


// para exportar
module.exports = Leroy;