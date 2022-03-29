// Creación del producto
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


// devolucion true, es el primer devolucion
const objetoPedidoSchema = {
    id_usuario: String,
    productos: Object,
    estado: String,
    fecha_creacion: Date,
    modo_entrega: String,
    direccion: String,
    cp: String,
    poblacion: String,
    devolucion: Boolean,
    filtros: Object,
};

const pedidoSchema = mongoose.Schema(objetoPedidoSchema, { versionKey: false })

pedidoSchema.plugin(AutoIncrement, { inc_field: 'id_pedido' });

const Pedido = mongoose.model("pedido", pedidoSchema);


// para exportar
module.exports = Pedido;