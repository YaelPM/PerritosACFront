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
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <For each="x" index="idx" of={this.state.juegos}>
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
                        Un videojuego es un juego electrónico en el que una o más personas interactúan por medio de un controlador, con un dispositivo que muestra imágenes de vídeo.1​ Este dispositivo electrónico, conocido genéricamente como «plataforma», puede ser una computadora, una máquina de arcade, una videoconsola o un dispositivo portátil, como por ejemplo un teléfono móvil, teléfono inteligente o tableta. La industria de los videojuegos es una de las principales en el mundo del arte y del entretenimiento.
                    </p>
                </div>
            </div>
        )
    }
}
export default Juegos;