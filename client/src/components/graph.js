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

export const Graph = () => {
    const adjacencyMatrix = new Array();
    const initialMatrix = {paramMatrix:adjacencyMatrix};
    // const [wall, setWall] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(initialWindow);
    const [paramMatrix, updateMatrix] = useState(initialMatrix);
    const [visibility, setVisibility] = useState(false);
    
    const nodes = tableHeight*tableWidth;
    useEffect(() =>{
        setTimeout(() =>{
            setVisibility(true)
        }, 1000);

        for(let i = 0; i < nodes; ++i){
            const temp = new Array(nodes);
            
            for(let j = 0; j < nodes; ++j){
                temp[j] = 0;
            }
            adjacencyMatrix.push(temp);
            updateMatrix({paramMatrix:adjacencyMatrix});
        }
        // console.log(adjacencyMatrix);
        // await new Promise(resolve => setTimeout(resolve), 500);
        //This algorithm needs work adds extra length to the matrix
        //uncomment and the length for element 979 will be <1030 this algorithm makes it 1030

        // for(let i = 0; i < nodes; ++i){
        //     for (let j = 0; j < nodes; ++j){
        //         if (0 <= i <= tableWidth - 1) {
        //             if (i === 0) {
        //                 adjacencyMatrix[i][i + 1] = 1;
        //             } else if (i === tableWidth - 1) {
        //                 adjacencyMatrix[i][i - 1] = 1;
        //             } else {
        //                 adjacencyMatrix[i][i + 1] = 1;
        //                 adjacencyMatrix[i][i - 1] = 1;
        //             }
        //             adjacencyMatrix[i][i + tableWidth] = 1;
        //         }
        //         if (nodes - tableWidth <= i <= nodes - 1) {
        //             if (i === nodes - tableWidth) {
        //                 adjacencyMatrix[i][i + 1] = 1;
        //             } else if (i === nodes - 1) {
        //                 adjacencyMatrix[i][i - 1] = 1;
        //             } else {
        //                 adjacencyMatrix[i][i + 1] = 1;
        //                 adjacencyMatrix[i][i - 1] = 1;
        //             }
        //             adjacencyMatrix[i][i - tableWidth] = 1;
        //         }
        //         if (0 === i % tableWidth) {
        //             if (i === 0) {
        //                 adjacencyMatrix[i][i - tableWidth] = 1;
        //             } else if (i === nodes - tableWidth) {
        //                 adjacencyMatrix[i][i + tableWidth] = 1;
        //             } else {
        //                 adjacencyMatrix[i][i - tableWidth] = 1;
        //                 adjacencyMatrix[i][i + tableWidth] = 1;
        //             }
        //             adjacencyMatrix[i][i + 1] = 1;
        //         }
        //         if(48 === i % tableWidth){
        //             if(i === tableWidth){
        //                 adjacencyMatrix[i][i - tableWidth] = 1;
        //             }
                    
        //             adjacencyMatrix[i][i+1] = 1;
        //         }
        //     }
        // }
        
        for(let i = 0; i < nodes; ++i){
            adjacencyMatrix[i].push(i);
            adjacencyMatrix[i].flag = false;
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
        updateMatrix({paramMatrix:adjacencyMatrix});
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
        console.log('generate random maze');
        const temp = paramMatrix.paramMatrix;
        for(let i = 0; i < Math.ceil(Math.random()*/* (500 - 300) +  */400+400); ++i){
            const num1 = Math.round(Math.random()*(nodes-1));
            // const idString = num1;
            // adjacencyMatrix[num1][num2] = 0;
            // console.log(num1)
            // console.log('random maze', paramMatrix.paramMatrix);
            // console.log(paramMatrix);
            temp[num1].flag = true;
            updateMatrix({paramMatrix:temp});
            const element = document.getElementById(num1);            
            element.className='MuiBox-root css-1rqr9y6 wall';
        }
    }

    const generateStartingPoint = () => {
        let index = 0;
        while(index < nodes-1){
            const num1 = Math.round(Math.random()*(nodes-1));
            const element = document.getElementById(num1);
            if(element.className !== 'MuiBox-root css-1rqr9y6 wall'){
                element.className='MuiBox-root css-1rqr9y6 starting';
                return;
            }
            index++;
        }
    }

    const generateTarget = () => {
        let index = 0;
        while(index < nodes-1){
            const num1 = Math.round(Math.random()*(nodes-1));
            const element = document.getElementById(num1);
            if(element.className !== 'MuiBox-root css-1rqr9y6 wall'){
                element.className='MuiBox-root css-1rqr9y6 target';
                return;
            }
            index++;
        }
    }

    
    return(
        <>
            <div className='graph'>
                <br/>
                <Button variant="outlined" onClick={generateStartingPoint} >
                    Set Starting Point
                </Button>
                <Button variant="outlined" onClick={generateTarget} >
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
            {visibility ? <BoxContainer tableHeight={tableHeight} tableWidth={tableWidth} matrix={paramMatrix}/> : null }
            </div>            
        </>        
    )
}