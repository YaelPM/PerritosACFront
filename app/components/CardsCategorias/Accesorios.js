import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Product from "../Product"
import Cookies from "universal-cookie";
const cookies= new Cookies()

class Accesorios extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            accesorios: []
        }
        this.accesorios= []
        APIInvoker.invokeGET(`/products/getProductCategory/${3}`,data => {
            this.setState({
                accesorios : data.datos
            })
            console.log(this.state.accesorios)
        }, error => {
        })
    }
    componentDidMount() {
        if(!cookies.get('login')){
            window.location.href="/";
        }
    }
    render() {
        return(
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <For each="x" index="idx" of={this.state.accesorios}>
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
                        Un controlador de videojuegos (palanca de mando, mando, volante, pistolas, etcétera) es un periférico de entrada usado para controlar videojuegos.

                        Normalmente, un controlador está conectado a una consola de videojuegos (vídeoconsola) o a un ordenador.
                    </p>
                </div>
            </div>
        )
    }
}
export default Accesorios;