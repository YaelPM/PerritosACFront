import React from 'react'
import "../../Styles/card.css"
import Nav from "../Nav"
import APIInvoker from "../../utils/APIInvoker";
import Mascota from "../Mascota"

class Gatos extends React.Component{

    constructor() {
        super();
        this.state = {
            categoria:'',
            imagen:'',
            gatos: []
        }
        this.mandos= []
        APIInvoker.invokeGET(`/products/getProductCategory/${2}`,data => {
            this.setState({
                gatos : data.datos
            })
            console.log(this.state.gatos)
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
                        <For each="x" index="idx" of={this.state.gatos}>
                            <Choose>
                                <When condition={idx==0}>
                                    <div className="carousel-item active">
                                        <Mascota key={idx} nombre={x.nombre} imagen={x.imagen}></Mascota>
                                    </div>
                                </When>
                                <When condition={idx>0}>
                                    <div className="carousel-item">
                                    <Mascota key={idx} nombre={x.nombre} imagen={x.imagen}></Mascota>
                                    </div>
                                </When>
                            </Choose>
                            <div className="carousel-item">
                            <Mascota key={idx} nombre={x.nombre} imagen={x.imagen}></Mascota>
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
                       Lista de gatos.
                    </p>
                </div>
            </div>
        )
    }
}
export default Gatos;