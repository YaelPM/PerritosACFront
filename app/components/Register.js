import React from 'react'
import update from "immutability-helper";
import "../Styles/Register.css";
import APIInvoker from "../utils/APIInvoker"
import {Link} from "react-router-dom"

class Register extends React.Component{


    constructor() {
        super();
        this.state = {
            idRol:'4',
            nombre:'',
            apellido:'',
            login:'',
            password:'',
            roles: [],
        }
        this.status = false
        this.usernameOk = false
        this.roles = []
        this.token= false

        APIInvoker.invokeGET('/users/verifyToken',data => {
            if(data.status){
                this.token= true
                console.log(data)
            }else {
                console.log(data)
            }
        })

        APIInvoker.invokeGET('/roles/getRoles',data => {
            this.setState({
                roles : data.datos
            })
            console.log(this.state.roles)
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
    buttonOnClick(e){
        //Signup
        let user = {
            idRol: this.state.idRol,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            login: this.state.login,
            password: this.state.password
        }
        APIInvoker.invokePOST('/users/signup',user, data => {
            alert(JSON.stringify(data))
            if(data.status){
                this.token=true
            }
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
    usernameValidate(e){
        let username = this.state.login
        APIInvoker.invokeGET(`/users/usernameValidate/${username}`,
            data => {
                //Primera forma de obtener la referencia de un control en el DOM
                //let label = document.getElementById('usernameMessage')
                this.labelUser.innerHTML = data.message
            },
            error => {
                //let label = document.getElementById('usernameMessage')
                this.labelUser.innerHTML = error.message
            })
    }
   render() {
       console.log("render"+this.token)
        return(

            <div>
                <Link to={"/login"}>
                    <img src="app/assets/images/flechaAtras.png" className={"flecha"} alt=""/>
                </Link>
                <h1 className={"title"}>Register</h1>
                <div className={"container"}>
                    <div className={"idRol"}>
                        <label htmlFor="idRol">idRol</label>
                        <select name="idRol" id="idRol" value={this.state.idRol} onChange={this.changeField.bind(this)}>
                                <Choose>
                                    <When condition={!this.token}>
                                        <option key={1} value={4}>Cajero</option>
                                    </When>
                                    <When condition={this.token}>
                                        <For each="item" index="idx" of={ this.state.roles }>
                                            <option key={item.idRol} value={item.idRol}>{item.rol}</option>
                                        </For>
                                    </When>
                                </Choose>
                        </select>
                    </div>
                    <div className={"nombre"}>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                               className="form-control"
                               name="nombre"
                               id="nombre"
                               placeholder="Ingrese su nombre"
                               aria-describedby="nombreHelp"
                               value={this.state.nombre}
                               onChange={this.changeField.bind(this)}/>
                    </div>
                    <div className={"apellido"}>
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text"
                               className="form-control"
                               name="apellido"
                               id="apellido"
                               placeholder="Ingrese su apellido"
                               aria-describedby="apellidoHelp"
                               value={this.state.apellido}
                               onChange={this.changeField.bind(this)}/>
                    </div>
                    <div className={"login"}>
                        <label htmlFor="login">Login</label>
                        <input type="text"
                               className="form-control"
                               name="login"
                               id="login"
                               placeholder="Ingrese su nombre de usuario"
                               aria-describedby="loginHelp"
                               value={this.state.login}
                               onChange={this.changeField.bind(this)}
                               onBlur={this.usernameValidate.bind(this)}/>
                    </div>
                    <div id="usernameMessage"
                         ref={ self => this.labelUser = self}
                         className="form-text text-white">
                    </div>
                    <div className={"password"}>
                        <label htmlFor="password"> Contraseña</label>
                        <input type="text"
                               className="form-control"
                               name="password"
                               id="password"
                               placeholder="Ingrese su contraseña"
                               aria-describedby="passwordHelp"
                               value={this.state.password}
                               onChange={this.changeField.bind(this)}/>
                    </div>
                    <div>
                            <input type="Button" id="reload" onClick={this.buttonOnClick.bind(this)} defaultValue={"Registrar"} className={"button"}/>
                    </div>
                </div>
            </div>
        )
   }
}
export default Register;