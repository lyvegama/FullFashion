// Creación del producto
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const objetoProductSchema = {
    nombre: String,
    target: String,
    tipo_prenda: String,
    estilo: String,
    color: String,
    imgUrl: String,
};

const productSchema = mongoose.Schema(objetoProductSchema, {versionKey: false})

productSchema.plugin(AutoIncrement, {inc_field: 'id_producto'});

const Producto = mongoose.model("productos", productSchema);


// para exportar
module.exports = Producto;

