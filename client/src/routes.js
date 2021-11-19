import { Sort } from "./components/sort";
import {Home} from './components/home'
import React from "react";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <div>            
            <Switch>
                <Route exact path ='/sort' component={Sort}/>
            </Switch>
            <Switch>
                <Route exact path ='/' component={Home}/>
            </Switch>
        </div>
    )
}

export default Routes;
