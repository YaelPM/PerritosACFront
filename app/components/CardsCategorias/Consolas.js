import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Product from "../Product"

class Consolas extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            consolas: []
        }
        this.consolas= []
        APIInvoker.invokeGET(`/products/getProductCategory/${1}`,data => {
            this.setState({
                consolas : data.datos
            })
            console.log(this.state.consolas)
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
                    <For each="x" index="idx" of={this.state.consolas}>
                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                    </For>
                </div>
            </div>
        )
    }
}
export default Consolas;