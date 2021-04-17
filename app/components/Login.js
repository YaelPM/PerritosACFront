import React from 'react'
import update from 'immutability-helper'
import APIInvoker from "../utils/APIInvoker"
import {Link} from "react-router-dom"
import Cookies from "universal-cookie"
import "../Styles/Login.css";
const cookies= new Cookies()

class Login extends React.Component{

    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
        }
        this.token= false

        APIInvoker.invokeGET('/users/verifyToken',data => {
            if(data.status){
                this.token= true
                console.log(this.token)
            }else {
                console.log(data)
            }
        })
    }
    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    iniciarSesion(e){
        let user = {
            login: this.state.username,
            password: this.state.password
        }

        APIInvoker.invokePOST('/users/login',user,data => {
            window.localStorage.setItem('token',data.token)
            cookies.set("login", user.login, "/")
            this.props.history.push('/home')
            window.location.href="/home"
        }, error =>{
            this.labelPassword.innerHTML = error.message
        })
    }

    usernameValidate(e){
        let username = this.state.username
        APIInvoker.invokeGET(`/users/usernameValidate/${username}`,
            data => {
                //Primera forma de obtener la referencia de un control en el DOM
                //let label = document.getElementById('usernameMessage')
            },
            error => {
                //let label = document.getElementById('usernameMessage')
                this.labelUser.innerHTML = error.message
            })
    }
    componentDidMount() {
        if(cookies.get('login')){
            window.location.href="/home";
        }
    }
    render() {
        return(
            <div className={"all"}>
                <If condition={this.token}>
                    <h1>Existe token</h1>
                </If>
                <p className="textLogin">Login</p>
                    <Link to={"/register"}>
                        <input type="Button" className={"buttonRegistrarse"} defaultValue={"Registrarse"}/>
                    </Link>
               <form className="Login" >

                   <div className="groupUser">
                       <label htmlFor="username" className="form-label">Nombre de usuario</label>
                       <input type="text"
                              className="form-control"
                              name="username"
                              id="username"
                              placeholder="Ingrese el nombre de usuario"
                              aria-describedby="usernameHelp"
                              value={this.state.username}
                              onChange={this.changeField.bind(this)}
                              onBlur={this.usernameValidate.bind(this)}/>
                       <div id="usernameMessage"
                            ref={ self => this.labelUser = self}
                            className="form-text text-white">
                       </div>
                   </div>
                   <div className="groupPassword">
                       <label htmlFor="password" className="form-label">Contraseña</label>
                       <input type="password"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Ingrese el nombre la contraseña"
                              aria-describedby="passwordHelp"
                              value={this.state.password}
                              onChange={this.changeField.bind(this)}/>
                       <div id="passwordMessage"
                            ref={ self => this.labelPassword = self}
                            className="form-text text-white">
                       </div>
                   </div>

                   <div className="iniciar">
                            <input type="Button" onClick={this.iniciarSesion.bind(this)} id="button" defaultValue="Iniciar"/>
                   </div>
               </form>
            </div>
        )
    }
}

export default Login;