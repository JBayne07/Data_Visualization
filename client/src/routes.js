import { Sort } from "./pages/sort";
import { Route, BrowserRouter as Router } from "react-router-dom";

const Routes = () => {
    return (
        <div>
            <Router>
                <Route path ='routes' component={Sort}/>
            </Router>
        </div>
    )
}

export default Routes;
