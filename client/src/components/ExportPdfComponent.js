import React from 'react';
import ReactToPrint from 'react-to-print';
import TableComponent from './TableComponent';
 
class ExportPdfComponent extends React.Component {
     
    render() {
      return (
        <div>

           <h6>Aquí tienes la factura de tu pedido, esperamos que te llegue lo antes posible.</h6>
           <br/>
           <br/>

          <TableComponent ref={(response) => (this.componentRef = response)} />
          
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="ButtonHome btn btn-primary btn-lg">Descarga o imprime el PDF</button>}
          />
        </div>
      );
    }
}
 
export default ExportPdfComponent;