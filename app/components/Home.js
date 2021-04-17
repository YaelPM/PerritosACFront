import React from 'react'
import "../Styles/Home.css"
import Nav from "./Nav"
import APIInvoker from "../utils/APIInvoker";
import Cookies from "universal-cookie";
const cookies= new Cookies()

class Home extends React.Component{
    constructor() {
        super();
        this.state={
            token: false
        }
        this.token= false
        APIInvoker.invokeGET('/users/verifyToken',data => {
            if(data.status){
                this.token= true
                console.log(data)
            }else {
                console.log(data)
            }
        })
    }
    componentDidMount() {
        if(!cookies.get('login')){
            window.location.href="/";
        }
    }
    render() {
        console.log(cookies.get("login"))
        return(
            <div className={"home"}>
                <Nav></Nav>
                <img  className={"imagenLogo"} src="app/assets/images/logo3.png"/>
            </div>
        )
    }
}
export default Home;