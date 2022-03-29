
// para conectar la base de datos
const mongoose = require("mongoose");


const url = "mongodb+srv://FullFashion:gcsrl1234@fullfashion.a3coz.mongodb.net/FullFashion?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Base de datos de Mongo conectada");
    })
    .catch((err) => {
        console.error(err);
    });
