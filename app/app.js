import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './components/Login'
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import addRoles from "../ControlRoles/addRoles";
import Mandos from "./components/CardsCategorias/Mandos";
import Consolas from "./components/CardsCategorias/Consolas";
import Product from "./components/Product";
import productAdministration from "./components/administrador/productAdministration";
import Accesorios from "./components/CardsCategorias/Accesorios";
import Juegos from "./components/CardsCategorias/Juegos";

class App extends React.Component{
    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path={"/home"} component={Home}/>
                    <Route exact path={"/accesorios"} component={Accesorios}/>
                    <Route exact path={"/juegos"} component={Juegos}/>
                    <Route exact path={"/consolas"} component={Consolas}/>
                    <Route exact path={"/mandos"} component={Mandos}/>
                    <Route exact path={"/addRoles"} component={addRoles}/>
                    <Route exact path={"/product"} component={Product}/>
                    <Route exact path={"/productAdministration"} component={productAdministration}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default App;