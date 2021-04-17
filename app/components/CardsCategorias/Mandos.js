import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Product from "../Product"

class Mandos extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            mandos: []
        }
        this.mandos= []
        APIInvoker.invokeGET(`/products/getProductCategory/${2}`,data => {
            this.setState({
                mandos : data.datos
            })
            console.log(this.state.mandos)
        }, error => {
        })
    }

    render() {
        return(
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div>
                    <For each="x" index="idx" of={this.state.mandos}>
                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                    </For>
                </div>
            </div>
        )
    }
}
export default Mandos;