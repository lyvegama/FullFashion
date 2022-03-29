import React from "react";
import { Link } from "react-router-dom";


function Footer () {

    
    return (
        <div id="contenedorFooter">
        <div id="footerFooter">
            <Link to="/privacy">Política de Privacidad</Link>
           <a  href="https://twitter.com/FullFashion2111"><img width="20px" alt="boton twitter" height="20px" src="https://raw.githubusercontent.com/moramraul/imagenesFashion/main/ImagenesFormulario/kisspng-computer-icons-logo-social-media-black-twitter-5b25332c0bec58.4286751415291645880489.png"></img></a>
           <p>© Full Fashion 2022 </p>
           
        </div>
        </div>
    );
    
}
export default Footer;