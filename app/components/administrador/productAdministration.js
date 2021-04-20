import React, {Component} from 'react'
import {Link} from "react-router-dom";
import APIInvoker from "../../utils/APIInvoker";
import update from "immutability-helper";
import "../../Styles/administration.css"

class productAdministration extends Component{

    constructor() {
        super();
        this.state={
            idProducto:"",
            idCategoria: "1",
            nombre:"",
            precio:"",
            imagen:"",
            descripcion:"",
            cantidad:"",
            idDelete:"",
            idUpdate:"",
            categorias:[],
            productos:[],
            token:false
        }
        this.categorias=[]
        this.productos=[]
        this.token= false

        APIInvoker.invokeGET('/users/verifyToken',data => {
            if(data.status){
                this.token= true
                console.log(data)
            }else {
                console.log(data)
            }
        })

        APIInvoker.invokeGET('/categories/getCategories',data => {
            console.log("entro1")
            this.setState({
                categorias : data.datos
            })
        }, error => {
        })
        console.log(this.categorias)
        APIInvoker.invokeGET('/products/getProducts',data => {
            this.setState({
                productos : data.datos
            })
        }, error => {
        })
    }
    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    add(e){
        //Signup
        let product = {
            idCategoria: this.state.idCategoria,
            nombre: this.state.nombre,
            precio: this.state.precio,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            cantidad: this.state.cantidad
        }
        APIInvoker.invokePOST('/products/addProduct',product, data => {
            alert(JSON.stringify(data.message))
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
    update(e){
        let product = {
            idProducto: this.state.idUpdate,
            idCategoria: this.state.idCategoria,
            nombre: this.state.nombre,
            precio: this.state.precio,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            cantidad: this.state.cantidad
        }
        APIInvoker.invokePUT('/products/updateProduct',product, data => {
            alert(JSON.stringify(data.message))
        }, error => {
            alert(JSON.stringify(error))
        })

        e.preventDefault();
    }
    delete1(e){
        let id1 = this.state.idDelete
        APIInvoker.invokeDELETE(`/products/deleteProduct/${id1}`,data => {
            alert(JSON.stringify(data.message))
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
    render() {
        if (this.token){
            return(
                <div className={"conten"}>
                    <Link to={"/home"}>
                        <img src="app/assets/images/flechaAtras.png" className={"flecha1"} alt=""/>
                    </Link>
                    <div className={"admn"}>
                        <div className={"list"}>
                            <div className="container border border-3 border-dark rounded-3">
                                    <div className="row border-bottom border-1 border-success">
                                        <div className="col border border-success">
                                            ID:
                                        </div>
                                        <div className="col border border-success">
                                            Nombre:
                                        </div>
                                        <div className="col border border-success">
                                            ID Categoria:
                                        </div>
                                        <div className="col border border-success">
                                            Acciones:
                                        </div>
                                    </div>
                                    <For each="x" index="idx" of={this.state.productos}>
                                        <div key={idx} className="row border-bottom border-1 border-success">
                                            <div className="col border border-success">
                                                {x.idProducto}
                                            </div>
                                            <div className="col border border-success">
                                                {x.nombre}
                                            </div>
                                            <div className="col border border-success">
                                                {x.idCategoria}
                                            </div>
                                            <div className="col border border-success">
                                                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Modal1">Actualizar</button>
                                                <button type="button" className="btn btn-danger">Eliminar</button>
                                            </div>
                                        </div>
                                    </For>
                                </div>
                        </div>

                        <div className="modal" tabIndex="-1" id={"Modal1"}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Modal body text goes here.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"adds"}>
                            <h5>Registrar productos</h5>
                            <div className={"barra"}>
                                <label htmlFor="idCategoria">Categoria</label>
                                <select name="idCategoria" id="idCategoria" value={this.state.idCategoria} onChange={this.changeField.bind(this)}>
                                    <For each="item" index="idx" of={ this.state.categorias }>
                                        <option key={idx} value={item.idCategoria}>{item.name}</option>
                                    </For>
                                </select>
                            </div>
                            <div className={"barra"}>
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text"
                                       className="form-control"
                                       name="nombre"
                                       id="nombre"
                                       placeholder="Ingrese el nombre"
                                       aria-describedby="nombreHelp"
                                       value={this.state.nombre}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div className={"barra"}>
                                <label htmlFor="precio">Precio</label>
                                <input type="text"
                                       className="form-control"
                                       name="precio"
                                       id="precio"
                                       placeholder="Ingrese el precio"
                                       aria-describedby="apellidoHelp"
                                       value={this.state.precio}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div className={"barra"}>
                                <label htmlFor="imagen">Imagen</label>
                                <input type="text"
                                       className="form-control"
                                       name="imagen"
                                       id="imagen"
                                       placeholder="Ingrese la url de la imagen"
                                       aria-describedby="loginHelp"
                                       value={this.state.login}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div className={"barra"}>
                                <label htmlFor="descripcion">Descripción</label>
                                <input type="text"
                                       className="form-control"
                                       name="descripcion"
                                       id="descripcion"
                                       placeholder="Ingrese la descripcion del producto"
                                       aria-describedby="loginHelp"
                                       value={this.state.descripcion}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div className={"barra"}>
                                <label htmlFor="cantidad">Cantidad</label>
                                <input type="text"
                                       className="form-control"
                                       name="cantidad"
                                       id="cantidad"
                                       placeholder="Ingrese la cantidad de productos existentes"
                                       aria-describedby="loginHelp"
                                       value={this.state.cantidad}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div>
                                <input type="Button"
                                       id="reload"
                                       onClick={this.add.bind(this)}
                                       defaultValue={"Registrar"}
                                       className={"boton1"}
                                />
                            </div>
                        </div>
                        <div className={"delete"}>
                            <div className={"barra"}>
                                <label htmlFor="idDelete">Delete product</label>
                                <input type="text"
                                       className="form-control"
                                       name="idDelete"
                                       id="idDelete"
                                       placeholder="Ingrese la id del producto a eliminar"
                                       aria-describedby="idHelp"
                                       value={this.state.idDelete}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div>
                                <input type="Button"
                                       id="reload"
                                       onClick={this.delete1.bind(this)}
                                       defaultValue={"Delete"}
                                       className={"boton1"}
                                />
                            </div>
                        </div>
                        <div className={"update"}>
                            <div className={"barra"}>
                                <label htmlFor="idUpdate">Update product</label>
                                <input type="text"
                                       className="form-control"
                                       name="idUpdate"
                                       id="idUpdate"
                                       placeholder="Ingrese la id del producto a actualizar"
                                       aria-describedby="idHelp"
                                       value={this.state.idUpdate}
                                       onChange={this.changeField.bind(this)}/>
                            </div>
                            <div>
                                <input type="Button"
                                       id="reload"
                                       onClick={this.update.bind(this)}
                                       defaultValue={"Update"}
                                       className={"btn"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <Link to={"/home"}>
                        <h3 className={"noToken"}>Solo acceso a administrador</h3>
                    </Link>
                </div>
            )
        }

    }
}
export default productAdministration;