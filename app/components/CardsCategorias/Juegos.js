import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Product from "../Product"

class Juegos extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            juegos: []
        }
        this.consolas= []
        APIInvoker.invokeGET(`/products/getProductCategory/${4}`,data => {
            this.setState({
                juegos : data.datos
            })
            console.log(this.state.juegos)
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
                    <For each="x" index="idx" of={this.state.juegos}>
                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                    </For>
                </div>
            </div>
        )
    }
}
export default Juegos;