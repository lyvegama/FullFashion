import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({socket, userName, sala}) {

    const[mensajeActual, setMensajeActual] = useState("")
    const[listaMensajes, setlistaMensajes] = useState([])

    const enviarMensaje = async () => {
        if (mensajeActual !== "") {
            const infoMensaje = {
                sala: sala,
                autor: userName,
                mensaje: mensajeActual,
                hora: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("enviarMensaje", infoMensaje);
            setlistaMensajes((lista) => [...lista, infoMensaje]);
            setMensajeActual("");
        }
    }

    useEffect(()=> {
        socket.on("mensajeRecibido", (data) => {
            setlistaMensajes((lista) => [...lista, data])
        })
    }, [socket])

    return (
        <div className="ventanaChat">
            <div className="headerChat">
                <p>Chat en directo</p>
            </div>
            <div className="bodyChat">
                <ScrollToBottom className="containerMensaje">
                 {listaMensajes.map((infoMensaje) => {
                     return (
                        <div className="mensaje" id={userName === infoMensaje.autor ? "tu" : "otro"}>
                            <div>
                                <div className="contenidoMensaje"> 
                                    <p>{infoMensaje.mensaje}</p>
                                </div>
                                <div className="metaMensaje"> 
                                    <p id="time">{infoMensaje.hora}</p>
                                    <p id="autor">{infoMensaje.autor}</p>
                                </div>
                            </div>
                        </div>
                    )
                 })}
                 </ScrollToBottom>
            </div>
            <div className="footerChat">
                <input type="text" value={mensajeActual} placeholder="Escribe tu mensaje..." onChange={(event) => {setMensajeActual(event.target.value)}} onKeyPress={(event) => {event.key === "Enter" && enviarMensaje()}}/>
                <button onClick={enviarMensaje}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat