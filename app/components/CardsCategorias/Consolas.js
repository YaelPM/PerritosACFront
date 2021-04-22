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
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <For each="x" index="idx" of={this.state.consolas}>
                            <Choose>
                                <When condition={idx==0}>
                                    <div className="carousel-item active">
                                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                                    </div>
                                </When>
                                <When condition={idx>0}>
                                    <div className="carousel-item">
                                        <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                                    </div>
                                </When>
                            </Choose>
                            <div className="carousel-item">
                                <Product key={idx} nombre={x.nombre} precio={x.precio} imagen={x.imagen} cantidad={x.cantidad} descripcion={x.descripcion}></Product>
                            </div>

                        </For>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                <div>
                    <p className={"fs-4 text-center d-flex"}>
                        Una videoconsola o consola de videojuegos es un sistema electrónico de entretenimiento para el hogar que ejecuta videojuegos contenidos en cartuchos, discos ópticos, discos magnéticos, tarjetas de memoria o cualquier dispositivo de almacenamiento.
                    </p>
                </div>
            </div>
        )
    }
}
export default Consolas;