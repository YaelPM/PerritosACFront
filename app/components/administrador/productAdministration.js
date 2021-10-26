import React, {Component} from 'react'
import {Link} from "react-router-dom";
import APIInvoker from "../../utils/APIInvoker";
import update from "immutability-helper";
import "../../Styles/administration.css"
import swal from 'sweetalert';

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
            token:false,
            updateID:"",
            updateName:""
        }
        this.categorias=[]
        this.productos=[]
        this.token= false

        APIInvoker.invokeGET('/users/verifyToken',data => {
            if(data.status){
                this.token= true
            }
        })
        APIInvoker.invokeGET('/categories/getCategories',data => {
            console.log("entro1")
            this.setState({
                categorias : data.datos
            })
        }, error => {
        })
        APIInvoker.invokeGET('/products/getProducts',data => {
            this.setState({
                productos : data.datos
            })
        }, error => {
        })
    }
    updateList(){
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
            imagen: this.state.imagen,
        }
        APIInvoker.invokePOST('/products/addProduct',product, data => {
            swal({
                title: "Realizado!!",
                text: "CLick en el botón!",
                icon: "success",
                button: "Hecho!",
            });
        }, error => {
            alert(JSON.stringify(error))
        })
        this.clear()
        this.updateList()
        e.preventDefault()
    }
    update(e){
        let product = {
            idProducto: this.state.updateID,
            idCategoria: this.state.idCategoria,
            nombre: this.state.nombre,
            imagen: this.state.imagen
        }
        APIInvoker.invokePUT('/products/updateProduct',product, data => {
            swal({
                title: "Mascota Actualizada!",
                text: product.nombre + " ha sido actualizado correctamente",
                icon: "success",
                button: "Ok",
            });
        }, error => {
            alert(JSON.stringify(error))
        })
        this.updateList()
        this.clear()
        e.preventDefault()
    }
    clear(){
        this.setState(
            {
                nombre:"",
                imagen:""
            }
        )
    }
    delete(){
        APIInvoker.invokeDELETE(`/products/deleteProduct/${this.state.idDelete}`,data => {
            swal({
                title: "Producto Eliminado!",
                text: "El producto se ha eliminado",
                icon: "warning",
                button: "Ok",
            });
        }, error => {
            alert(JSON.stringify(error))
        })
        this.updateList()
        this.setState({idDelete: ""})
    }
    render() {
        if (this.token){
            return(
                <div className={"conten"}>
                    <Link to={"/home"}>
                        <img src="app/assets/images/flechaAtras.png" className={"flecha1"} alt=""/>
                    </Link>
                    <div className={"admn"}>
                        <div>
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ModalAdd">Añadir producto</button>
                        </div>
                        <div className={"list"}>
                            <div className="container rounded-2 text-center fs-6 bg-white border border-3 border-dark rounded-3">
                                    <div className="row border-bottom fs-5 border-1 border-success">
                                        <div className="col border col-2 border-dark">
                                            ID:
                                        </div>
                                        <div className="col col-3 border border-dark">
                                            Nombre:
                                        </div>
                                        <div className="col col-4 border border-dark">
                                            Categoria:
                                        </div>
                                        <div className="col border col-3 border-dark">
                                            Acciones:
                                        </div>
                                    </div>
                                    <If condition={this.state.productos!=null}>
                                        <For each="x" index="idx" of={this.state.productos}>
                                            <div key={idx} className="row border-bottom border-1 border-dark">
                                                <div className="col col-2 border border-dark">
                                                    {x.idProducto}
                                                </div>
                                                <div className="col col-3 border border-dark">
                                                    {x.nombre}
                                                    <img src={x.imagen} alt=""/>
                                                </div>
                                                <div className="col border col-4 border-dark">
                                                    <Choose>
                                                        <When condition={x.idCategoria==1}>
                                                            perro
                                                        </When>
                                                        <When condition={x.idCategoria==2}>
                                                            Gato
                                                        </When>
                                                    </Choose>
                                                </div>

                                                <div className="col border col-3 border-dark">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ModalUpdate"
                                                        onClick={()=>{
                                                            this.setState(
                                                                {
                                                                    updateID: x.idProducto,
                                                                    updateName: x.nombre,
                                                                    idCategoria:x.idCategoria,
                                                                    nombre:x.nombre,
                                                                    imagen: x.imagen
                                                                    }
                                                                )
                                                            }}>
                                                        Actualizar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ModalDelete"
                                                        onClick={
                                                            ()=>{this.setState({idDelete: x.idProducto})}}>
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </For>
                                    </If>
                                    <If condition={this.state.productos==null}>
                                        No hay datos
                                    </If>
                                </div>
                        </div>

                        <div className="modal" tabIndex="-1" id={"ModalUpdate"}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Actualizar {this.state.updateName}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.clear.bind(this)}>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <label htmlFor="updateID">ID</label>
                                            <input type="text" readOnly defaultValue={this.state.updateID}/>
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
                                            <label htmlFor="idCategoria">Categoria</label>
                                            <select name="idCategoria" id="idCategoria" value={this.state.idCategoria} onChange={this.changeField.bind(this)}>
                                                <For each="item" index="idx" of={ this.state.categorias }>
                                                    <option key={idx} value={item.idCategoria}>{item.name}</option>
                                                </For>
                                            </select>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="imagen">Imagen</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="imagen"
                                                   id="imagen"
                                                   placeholder="Ingrese la url de la imagen"
                                                   aria-describedby="loginHelp"
                                                   value={this.state.imagen}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal" onClick={this.clear.bind(this)}>Close
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.update.bind(this)}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal" on tabIndex="-1" id={"ModalAdd"}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Añadir producto</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className={"barra"}>
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="nombre"
                                                   id="nombre1"
                                                   placeholder="Ingrese el nombre"
                                                   aria-describedby="nombreHelp"
                                                   value={this.state.nombre}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="idCategoria">Categoria</label>
                                            <select name="idCategoria" id="idCategoria" value={this.state.idCategoria} onChange={this.changeField.bind(this)}>
                                                <For each="item" index="idx" of={ this.state.categorias }>
                                                    <option key={idx} value={item.idCategoria}>{item.name}</option>
                                                </For>
                                            </select>
                                        </div>
                                        <div className={"barra"}>
                                            <label htmlFor="imagen">Imagen</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="imagen"
                                                   id="imagen1"
                                                   placeholder="Ingrese la url de la imagen"
                                                   aria-describedby="loginHelp"
                                                   value={this.state.imagen}
                                                   onChange={this.changeField.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal" onClick={this.clear.bind(this)}>Close
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.add.bind(this)}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal" tabIndex="-1" id={"ModalDelete"}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Eliminar{this.state.updateName}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        ¿Estás seguro de eliminar este producto?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Mejor no :(
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.delete.bind(this)}>De acuerdo :)</button>
                                    </div>
                                </div>
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