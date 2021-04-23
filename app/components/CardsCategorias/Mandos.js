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
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <For each="x" index="idx" of={this.state.mandos}>
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
                    <button className="carousel-control-prev bg-dark" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next bg-dark" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className={"foother bg-secondary"}>
                    <p className={"fs-4 text-center d-flex"}>
                        Un mando de videojuegos (gamepad en inglés) es un dispositivo de entrada usado para interactuar con un videojuego ya sea en una consola, o en un ordenador.
                    </p>
                </div>
            </div>
        )
    }
}
export default Mandos;