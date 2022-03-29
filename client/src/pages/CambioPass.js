import React, { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios";

function CambioPass() {

    let infoUsuario = JSON.parse(localStorage.getItem("user"))
    const [antPassword, setAntPassword] = useState("")
    const [nuevaPassword, setNuevaPassword] = useState("")
    const [nuevaPassword2, setNuevaPassword2] = useState("")

    const [viewAlertViejaPassMal, setViewAlertViejaPassMal] = useState(false);
    const [viewAlertaNuevasPassMal, setViewAlertaNuevasPassMal] = useState(false);
    

    const cambiarPass = () => {

        if (nuevaPassword === nuevaPassword2) {

            const data = {
                password: nuevaPassword,
                antPassword: antPassword,
                idUsuario: infoUsuario.idUsuario
            };

            localStorage.removeItem("user");
        
            axios.post("/insertarpasscambiada", data).then((res) => {
                if (res.data === "passCambiada") {
                    alert("La contraseña ha sido actualizada")
                    window.location.href = "http://localhost:3000/"
                }
                if (res.data === "errorPass") {
                    setViewAlertViejaPassMal(true)
                }
            })
        } else {
            setViewAlertaNuevasPassMal(true)
        }
    }


    return (
        <div>
            <form>
                <br /><br /><br />
                <label htmlFor="PassAnterior">Contraseña anterior: &nbsp;</label>
                <input type="password" name="passAnterior" id="passAnterior" onChange={(e) => setAntPassword(e.target.value)} />
                {viewAlertViejaPassMal ? (
                    <motion.p
                        initial={{ x: -1000, color: "#e30b2c" }}
                        animate={{ fontSize: 20, x: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >La antigua contraseña no es correcta</motion.p>
                ) : ""}
                <br /><br />
                <label htmlFor="NuevaPass">Nueva contraseña: &nbsp;</label>
                <input type="password" name="password" id="password" onChange={(e) => setNuevaPassword(e.target.value)} />
                <br /><br />
                <label htmlFor="NuevaPass">Repetir nueva contraseña: &nbsp;</label>
                <input type="password" name="password2" id="password2" onChange={(e) => setNuevaPassword2(e.target.value)} />
                <br /><br />
                {viewAlertaNuevasPassMal ? (
                    <motion.p
                        initial={{ x: -1000, color: "#e30b2c" }}
                        animate={{ fontSize: 20, x: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >Las nuevas contraseñas no coinciden</motion.p>
                ) : ""}
                <button type="button" className="ButtonHome btn btn-primary btn-lg" onClick={cambiarPass}>Cambiar</button>
            </form>
        </div>
    )
}

export default CambioPass;