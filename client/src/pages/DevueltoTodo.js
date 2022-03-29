import React from "react";


function DevueltoTodo() {

    const devolverTodo = () => {
        
        window.location.href = "http://localhost:3000/perfil"
    }


    return (

        <div>
        <h1>Sentimos que los artículos no hayan sido de su agrado.</h1>
        <h2><p>En cuestión de 24-48 horas se recogerá todo su pedido y tendrá su reembolso</p></h2>
        <button className="ButtonHome btn btn-primary btn-lg" onClick={devolverTodo}>Volver</button>

    </div>

    );

}
export default DevueltoTodo;