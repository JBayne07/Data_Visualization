import '../components/graph.css'
import { Button, Slider } from "@mui/material";
import { BoxContainer } from "./boxContainer";
import { useEffect, useState } from "react";

// Create a datastructure for the maze
// Set up a random start point
// Set up a random target point
// Create BFS
// Create DFS
// Create Dijkstra
// Create Johnsons
// Create floyd warshall
// Create Max Flow
// onClick wall setup
// Move starting point (lower priority)
// Move target point (lower priority)

export const Graph = () => {
    const [wall, setWall] = useState(false);

    const generateRandomMaze = () =>{
        for(let i = 0; i < Math.ceil(Math.random()*(500 - 300) + 300); ++i){
            const num1 = Math.round(Math.random()*19);
            const num2 = Math.round(Math.random()*48);
            const idString = num1+'-'+num2;
            console.log(idString);
            const element = document.getElementById(idString);
            console.log(element);
            element.className='MuiBox-root css-1rqr9y6 wall';
        }
    }

    return(
        <>
            <div className='graph'>
                <br/>
                <Button variant="outlined" >
                    Set Starting Point
                </Button>
                <Button variant="outlined"  >
                    Set Target
                </Button>                
                <Button variant="outlined" >
                    Create Maze
                </Button>
                <Button variant="outlined" onClick={generateRandomMaze} >
                    Generate Random Maze
                </Button>
                <br/>
                <br/>
            </div>
            <div id='graphBoxContainer'>
                <BoxContainer/>
            </div>
        </>        
    )
}