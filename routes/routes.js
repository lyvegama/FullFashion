const router = require("express").Router()
const products = require("../controllers/product.controllers")
const user = require("../controllers/users.controllers")
const admin = require("../controllers/admin.controllers")
const actionCompras = require("../controllers/compras.controllers")

router.post("/register", user.registro)
router.post("/login", user.loguear)
router.post("/modifyprofile", user.updateUser)
//Banear usuario
router.post("/banearuser", user.banearUser);

router.post("/checkout", actionCompras.pago) 

router.post("/addproduct", admin.addProduct)
router.post("/deleteproduct", admin.eraseProduct)
router.post("/modifyproduct", admin.modifyProduct)

//Recoge todas las compras del usuario
router.post("/historial", actionCompras.buscarCompras);
router.post("/allproductofiltro", products.buscarProductos);

//Busca cada articulo de devoluciones
router.post("/buscararticulo", products.buscarProducto);

router.post("/actualizarpedido", actionCompras.actualizarPedido);
router.post("/quitarpedido", actionCompras.quitarPedido);
router.post("/devolucionprimera", actionCompras.devolucionPrimera);


router.post("/busquedalook", products.buscarProductos);
// router.get("/resultadolook/:altura/:color/:estilo/:peso/:talla/:target", function (req,res) {

router.post("/estilosfavoritos", user.addEstilosFav);
router.post("/direcciondos", user.addSegundaDireccion)

router.get("/resultadolook/", (req,res) => {
    res.json(req.params)

})

router.post("/cambiarpass", user.cambiarPass);

router.get("/cambiarpass/:id/:token", user.confirmUserGet);

router.post("/enviarmail",actionCompras.enviarMail); //prueba test para mail

router.post("/insertarpasscambiada", user.insertarPassCambiada);
module.exports = router