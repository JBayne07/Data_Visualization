import {Sort} from "./pages/sort";
import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const Routes = () => {
    return (
        <div>            
            <Switch>
                <Route exact path ='/sort' component={Sort}/>
            </Switch>    
        </div>
    )
}

export default Routes;
