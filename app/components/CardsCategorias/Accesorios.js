import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Product from "../Product"

class Accesorios extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            accesorios: []
        }
        this.accesoios= []
        APIInvoker.invokeGET(`/products/getProductCategory/${3}`,data => {
            this.setState({
                accesorios : data.datos
            })
            console.log(this.state.accesorios)
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
                    <For each="x" index="idx" of={this.state.accesorios}>
                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                    </For>
                </div>
            </div>
        )
    }
}
export default Accesorios;