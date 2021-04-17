import React from "react"
import update from "immutability-helper";
import "../app/Styles/addRoles.css"
import APIInvoker from "../app/utils/APIInvoker";
import {Link} from "react-router-dom";

class addRoles extends React.Component{

    constructor() {
        super();
        this.state = {
            rol:'',
            description:''
        }
    }
    changeField1(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }
    buttonOnClick(e){
        //Signup
        let Rol = {
            rol: this.state.rol,
            description: this.state.description
        }
        APIInvoker.invokePOST('/roles/addRol',Rol, data => {
            alert(JSON.stringify(data))
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <Link to={"/login"}>
                    <img src="app/assets/images/flechaAtras.png" className={"flecha"} alt=""/>
                </Link>
                <div className={"box"}>

                    <h1>Add Roles</h1>
                    <div>
                        <label htmlFor="rol">Ingrese el nombre del rol</label>
                        <input type="text"
                               className="form-control"
                               name="rol"
                               id="rol"
                               placeholder="Ingrese el nombre del rol"
                               aria-describedby="rolHelp"
                               value={this.state.rol}
                               onChange={this.changeField1.bind(this)}/>
                    </div>
                    <div className={"description"}>
                        <label htmlFor="description">Ingrese el nombre del rol</label>
                        <input type="text"
                               className="form-control"
                               name="description"
                               id="description"
                               placeholder="Ingrese una breve descripcion"
                               aria-describedby="descriptionHelp"
                               value={this.state.description}
                               onChange={this.changeField1.bind(this)}/>
                    </div>
                    <div>
                        <input type="button" onClick={this.buttonOnClick.bind(this)} className={"button"} defaultValue={"añadir"}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default addRoles;