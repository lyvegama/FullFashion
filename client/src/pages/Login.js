import React, { useState } from "react";
import axios from "axios"
import {motion} from "framer-motion"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [viewEmailError, setViewEmailError] = useState(false)
    const [viewPasswordError, setViewPasswordError] = useState(false)

    const loguear = () => {

        let usuarioLogin = {
            email,
            password
        }

        axios.post("/login", usuarioLogin).then((res) => {
            if (res.data === "userNoExiste") {
                setViewEmailError(true)
            } else if (res.data === "passwordMal") {
                setViewPasswordError(true)
            } else {
                if (!res.data.baneado) {
                    sessionStorage.setItem("infoUser", JSON.stringify(res.data));
                    window.location.href = "http://localhost:3000/"
                } else {
                    window.location.href = "http://localhost:3000/baneado"
                }
            }

        })
    }



    return (
        <div>
            <h1>Inicia sesión</h1>
            <div className="form-control">
                {viewEmailError ? (<motion.p
                        initial={{ x: -1000, color: "#e30b2c" }}
                        animate={{ fontSize: 20, x: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >Este email NO está registrado. Por favor, regístrate para poder iniciar sesión</motion.p>): ""}
                <label >Email</label>
                <br></br>
                <input type="text" name="email" placeholder="Ej: ejemplo@email.com" onChange={(e) => setEmail(e.target.value)}></input>
                <br></br>
                <label>Contraseña</label>
                <br></br>
                <input type="password" name="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}></input>
                {viewPasswordError ? (<motion.p
                        initial={{ x: -1000, color: "#e30b2c" }}
                        animate={{ fontSize: 20, x: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >Usuario o contraseña incorrectos, inténtalo de nuevo.</motion.p>) : ""}
                <br></br>
                <br></br>
                <button type="button" className="ButtonHome btn btn-primary btn-lg" variant="primary" onClick={loguear}>Enviar</button>
            </div>
        </div>
    );

}
export default Login;