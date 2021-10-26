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
import Perros from "./components/CardsCategorias/Perros";
import Gatos from "./components/CardsCategorias/Gatos";
import Mascota from "./components/Mascota";
import productAdministration from "./components/administrador/productAdministration";

class App extends React.Component{
    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path={"/home"} component={Home}/>
                    <Route exact path={"/perros"} component={Perros}/>
                    <Route exact path={"/gatos"} component={Gatos}/>
                    <Route exact path={"/addRoles"} component={addRoles}/>
                    <Route exact path={"/mascota"} component={Mascota}/>
                    <Route exact path={"/productAdministration"} component={productAdministration}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default App;