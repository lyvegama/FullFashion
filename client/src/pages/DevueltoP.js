import React from "react";


function DevueltoP() {


    const devolver = () => {
       
        window.location.href = "http://localhost:3000/perfil"
    }


    return (

        <div>
            <h1>Hemos recibido la petición de cambio de productos</h1>
            <h2><p> Sentimos mucho que no le hayan gustado algunos de nuestros productos. 
                En 24-48 horas recibirá los nuevos productos, por favor, entregue los productos al repartidor</p> </h2>
            <h2><p> ¡Muchas Gracias!</p> </h2>

            <button className="ButtonHome btn btn-primary btn-lg" onClick={devolver}>Volver</button>
        </div>

    );

}
export default DevueltoP;