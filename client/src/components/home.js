import { Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import './home.css';

export const Home = () => {
    const history = useHistory();

    return(
        <div className="homeContainer">
            <Typography className="mainTitle" variant="h2" component="div" margin={'auto'}>
                Welcome to the Algorithm Visualizer!
            </Typography>
            <div className="contentContainer">
                <Typography className="subTitle" variant="h4">
                    Please select an algorithm type to begin:
                </Typography>
                <div className="buttonContainer">
                    <Button variant="outlined" sx={{ marginRight: '0.25rem' }} onClick={() => {history.push('/sort')}}>
                        SORTING
                    </Button>
                    <Button variant="outlined" sx={{ marginLeft: '0.25rem' }} onClick={() => {history.push('/graph')}}>
                        GRAPH
                    </Button>
                </div>
            </div>
        </div>
    )   
}