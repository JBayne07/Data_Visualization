import '../components/graph.css'
import { Button } from "@mui/material";
import { BoxContainer } from "./boxContainer";
import { useEffect, useState } from "react";
const initialWindow = {height: window.innerHeight, width: window.innerWidth};

const tableHeight = 20;
const tableWidth = 49;

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

// array[0][500].push(1);

export const Graph = () => {
    const [wall, setWall] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(initialWindow);
    const adjacencyMatrix = new Array();
    const nodes = tableHeight*tableWidth;
    useEffect(() =>{
        for(let i = 0; i < nodes; ++i){
            const temp = new Array(nodes);
            
            for(let i = 0; i < nodes; ++i){
                temp[i] = 0;
            }
            adjacencyMatrix.push(temp);
        }
        
        for(let i = 0; i < nodes; ++i){
            for (let j = 0; j < nodes; ++j){
                if (0 <= i <= tableWidth - 1) {
                    if (i === 0) {
                        adjacencyMatrix[i][i + 1] = 1;
                    } else if (i === tableWidth - 1) {
                        adjacencyMatrix[i][i - 1] = 1;
                    } else {
                        adjacencyMatrix[i][i + 1] = 1;
                        adjacencyMatrix[i][i - 1] = 1;
                    }
                    adjacencyMatrix[i][i + tableWidth] = 1;
                }
                if (nodes - tableWidth <= i <= nodes - 1) {
                    if (i === nodes - tableWidth) {
                        adjacencyMatrix[i][i + 1] = 1;
                    } else if (i === nodes - 1) {
                        adjacencyMatrix[i][i - 1] = 1;
                    } else {
                        adjacencyMatrix[i][i + 1] = 1;
                        adjacencyMatrix[i][i - 1] = 1;
                    }
                    adjacencyMatrix[i][i - tableWidth] = 1;
                }
                if (0 === i % tableWidth) {
                    if (i === 0) {
                        adjacencyMatrix[i][i - tableWidth] = 1;
                    } else if (i === nodes - tableWidth) {
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    } else {
                        adjacencyMatrix[i][i - tableWidth] = 1;
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    }
                    adjacencyMatrix[i][i + 1] = 1;
                }
            }
        }
        // for(let i = 0; i < tableHeight; ++i){
        //     for(let j = 0; j < tableWidth; ++j){

        //     }
        //     if(i===0 || i===48 || i===980 || i===20){
        //         for(let j = 0; j < 2; ++j){
        //             adjacencyMatrix[i].push(1);
        //         }
        //     }else if(i===i*50 || i===){
        //         for(let j = 0; j < 3; ++j){
        //             adjacencyMatrix[i].push(1);
        //         }
        //     }else{
        //         for(let j = 0; j < 4; ++j){
        //             // adjacencyMatrix[j].push(1);
        //         }
        //     }            
        // }
        console.log(adjacencyMatrix);
    }, [])

    // Handles whenever the window resizes
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({height: window.innerHeight, width: window.innerWidth})
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    console.log(windowDimensions.height, windowDimensions.width);

    const generateRandomMaze = () =>{

        for(let i = 0; i < Math.ceil(Math.random()*(500 - 300) + 300); ++i){
            const num1 = Math.round(Math.random()*19);
            const num2 = Math.round(Math.random()*48);
            const idString = num1+'-'+num2;
            // adjacencyMatrix[num1][num2] = 0;
            // console.log(adjacencyMatrix);
            const element = document.getElementById(idString);            
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
            <div id='graphBoxContainer' >
                <BoxContainer tableHeight={tableHeight} tableWidth={tableWidth}/>
            </div>
        </>        
    )
}