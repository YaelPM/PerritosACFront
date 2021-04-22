import React from 'react'
import "../Styles/nav.css"
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";
const cookies= new Cookies()

class Nav extends React.Component{
    constructor() {
        super();
        this.state= {
            categorias: []
        }
    }
    cerrarSesion(){
        cookies.remove("login", {path: "/"})
        window.location.href="/"
        window.localStorage.removeItem("token")
    }
    render() {
        return(
            <div>
                <ul className="nav d-flex flex-row bg-light nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/consolas">Consolas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/juegos">Juegos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/mandos">Mandos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/accesorios">Accesorios</a>
                    </li>
                    <li className="nav-item dropdown bg-light">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            Administración
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/productAdministration">Productos</a></li>
                            <li><a className="dropdown-item" href="/register">Usuarioss</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a aria-readonly className="nav-link active bg-danger text-primary" aria-current="page" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Nav;