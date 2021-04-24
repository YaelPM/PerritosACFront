import React from 'react'
import Cookies from "universal-cookie";
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
                <ul className="nav justify-content-center bg-transparent nav-tabs">
                    <li className="navs nav-item">
                        <a className="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li className="navs nav-item">
                        <a className="nav-link active" aria-current="page" href="/consolas">Consolas</a>
                    </li>
                    <li className="navs nav-item">
                        <a className="nav-link active" href="/juegos">Juegos</a>
                    </li>
                    <li className="navs nav-item">
                        <a className="nav-link active" href="/mandos">Mandos</a>
                    </li>
                    <li className="navs nav-item">
                        <a className="nav-link active" href="/accesorios">Accesorios</a>
                    </li>
                    <li className="navs nav-item dropdown bg-light">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            Administración
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/productAdministration">Productos</a></li>
                            <li><a className="dropdown-item" href="/register">Usuarioss</a></li>
                        </ul>
                    </li>
                    <li className="navs nav-pills nav-fill">
                        <a className="nav-link active bg-danger text-light" aria-current="page" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Nav;