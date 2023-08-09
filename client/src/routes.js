import { Home } from './components/home'
import { Sort } from "./components/sort";
import { Graph } from "./components/graph"
import React from "react";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path ='/' component={Home}/>
            </Switch>           
            <Switch>
                <Route exact path ='/sort' component={Sort}/>
            </Switch>            
            <Switch>
                <Route exact path ='/graph' component={Graph}/>
            </Switch>
        </>
    )
}

export default Routes;
