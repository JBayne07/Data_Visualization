import '../components/graph.css'
import { Button } from "@mui/material";
import { BoxContainer } from "./boxContainer";
import React, { useEffect, useState } from "react";
const initialWindow = {height: window.innerHeight, width: window.innerWidth};

const tableHeight = 20;
const tableWidth = 49;
const randomSize = 400;
let stopFlag = false;

// Create a datastructure for the maze - done
// Set up a random start point - done
// Set up a random target point - done
// Create BFS - done
// Create DFS - done
// Create Dijkstra
// Create Johnsons
// Create floyd warshall
// Create Max Flow
// onClick wall setup - done
// Move starting point (lower priority) - done
// Move target point (lower priority) - done
//Scale the window length and width to the box size
export const Graph = () => {
    const adjacencyMatrix = [];
    const initialMatrix = {paramMatrix:adjacencyMatrix};
    // const [clearedMatrix, setClearedMatrix] = useState();
    // const [wall, setWall] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(initialWindow);
    const [paramMatrix, updateMatrix] = useState(initialMatrix);
    const [visibility, setVisibility] = useState(false);
    
    const nodes = tableHeight*tableWidth;
    useEffect(() =>{
        setTimeout(() =>{
            setVisibility(true);
            showMarkers();
        }, 1000);

        generateMaze();        
        console.log(adjacencyMatrix);
        // setClearedMatrix(adjacencyMatrix);
        updateMatrix({paramMatrix:adjacencyMatrix});
        console.log('starting');
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
        
    });

    console.log(windowDimensions.height, windowDimensions.width);    

    const generateMaze = () => {
        
        for(let i = 0; i < nodes; ++i){
            const temp = new Array(nodes);
            
            for(let j = 0; j < nodes; ++j){
                temp[j] = 0;
            }
            adjacencyMatrix.push(temp);
            // updateMatrix({paramMatrix:adjacencyMatrix});
        }        

        //Creates all the edges for the maze
        for(let i = 0; i < nodes; ++i){
            for (let j = 0; j < nodes; ++j){                
                if( i>= 0 && i <= tableWidth-1){ // Top Row Check
                    if(i === 0){
                        adjacencyMatrix[i][i + 1] = 1;
                    }else if (i === tableWidth - 1) {
                        adjacencyMatrix[i][i - 1] = 1;
                    }else {
                        adjacencyMatrix[i][i + 1] = 1;
                        adjacencyMatrix[i][i - 1] = 1;
                    }
                    adjacencyMatrix[i][i + tableWidth] = 1;
                }
                if(i >= nodes-tableWidth && i <= nodes-1){ //Bottom row check
                    if(i === nodes - tableWidth){
                        adjacencyMatrix[i][i + 1] = 1;
                    }else if(i === nodes -1){
                        adjacencyMatrix[i][i - 1] = 1
                    }else{
                        adjacencyMatrix[i][i + 1] = 1;
                        adjacencyMatrix[i][i - 1] = 1;
                    }
                    adjacencyMatrix[i][i - tableWidth] = 1;
                }
                if(0 === i % tableWidth){ //Left column check
                    if (i === 0) {
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    } else if (i === nodes - tableWidth) {
                        adjacencyMatrix[i][i - tableWidth] = 1;
                    } else {
                        adjacencyMatrix[i][i - tableWidth] = 1;
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    }
                    adjacencyMatrix[i][i + 1] = 1;
                }
                if(48 === i % tableWidth){ //Right column check
                    if(i === tableWidth-1){
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    }else if(i === nodes-1){
                        adjacencyMatrix[i][i - tableWidth] = 1;
                    }else{
                        adjacencyMatrix[i][i - tableWidth] = 1;
                        adjacencyMatrix[i][i + tableWidth] = 1;
                    }                    
                    adjacencyMatrix[i][i-1] = 1;
                }
                if(!( (i>= 0 && i <= tableWidth-1) || (i >= nodes-tableWidth && i <= nodes-1) || (0 === i % tableWidth) || (48 === i % tableWidth))){ //The rest of the nodes
                    adjacencyMatrix[i][i + tableWidth] = 1;
                    adjacencyMatrix[i][i - tableWidth] = 1;
                    adjacencyMatrix[i][i + 1] = 1;
                    adjacencyMatrix[i][i-1] = 1;
                }
            }
        }
        //Add id and flag at the end
        for(let i = 0; i < nodes; ++i){
            adjacencyMatrix[i].push(i);
            adjacencyMatrix[i].flag = false;
        }        
    }

    const showMarkers = () => {
        let num = (10*tableWidth+10);
        let element = document.getElementById(num);
        element.className = 'MuiBox-root css-1rqr9y6 starting';
        num = (10*tableWidth+40);
        element = document.getElementById(num);
        element.className = 'MuiBox-root css-1rqr9y6 target';
        console.log('markers are shown');
    }

    const clearMaze = async () =>{
        console.log('clear maze');
        stopFlag = false;
        await generateMaze();
        await updateMatrix({paramMatrix:adjacencyMatrix});
        console.log('cleared');
        await setVisibility(false);
        await setVisibility(true);
        await showMarkers();
        console.log('everything reset');
    }

    const generateRandomMaze = async () =>{
        await clearMaze();
        console.log('matrix is cleared');
        await wallGenerate();
    }

    const wallGenerate = () => {
        console.log('generate random maze');
        const temp = adjacencyMatrix;
        const startId = parseInt(document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting')[0].id);
        const targetId = parseInt(document.getElementsByClassName('MuiBox-root css-1rqr9y6 target')[0].id);
        for(let i = 0; i < Math.ceil(Math.random()*randomSize+randomSize); ++i){
            const num = Math.round(Math.random()*(nodes-1));
            if(num === startId || num === targetId){
                continue;
            }
            if( num >= 0 && num <= tableWidth-1){
                if(num === 0){
                    temp[num+1][num] = 0; 
                    temp[num+tableWidth][num] = 0;
                }else if (num === tableWidth - 1) {
                    temp[num-1][num] = 0;
                    temp[num+tableWidth][num] = 0;
                }else {
                    temp[num-1][num] = 0;
                    temp[num+1][num] = 0;
                    temp[num+tableWidth][num] = 0;
                }
            }
            if(num >= nodes-tableWidth && num <= nodes-1){
                if(num === nodes - tableWidth){
                    temp[num+1][num] = 0;
                    temp[num-tableWidth][num] = 0;
                }else if(num === nodes-1){
                    temp[num-1][num] = 0;
                    temp[num-tableWidth][num] = 0;
                }else{
                    temp[num-1][num] = 0;
                    temp[num+1][num] = 0;
                    temp[num-tableWidth][num] = 0;
                }
            }
            if(0 === num % tableWidth){
                if(num === 0){
                    temp[num+1][num] = 0;
                    temp[num + tableWidth][num] = 0;
                }else if(num === nodes - tableWidth){
                    temp[num+1][num] = 0;
                    temp[num - tableWidth][num] = 0;
                }else{                    
                    temp[num+1][num] = 0;
                    temp[num + tableWidth][num] = 0;
                    temp[num - tableWidth][num] = 0;
                }
            }
            if(48 === num % tableWidth){
                if(num === tableWidth-1){
                    temp[num-1][num] = 0;
                    temp[num+tableWidth][num] = 0;
                }else if(num === nodes-1){
                    temp[num-1][num] = 0;
                    temp[num-tableWidth][num] = 0;
                }else{
                    temp[num-1][num] = 0;
                    temp[num+tableWidth][num] = 0;
                    temp[num-tableWidth][num] = 0;
                }
            }
            if(!( (num>= 0 && num <= tableWidth-1) || (num >= nodes-tableWidth && num <= nodes-1) || (0 === num % tableWidth) || (48 === num % tableWidth))){
                temp[num+1][num] = 0;
                temp[num-1][num] = 0;
                temp[num+tableWidth][num] = 0;
                temp[num-tableWidth][num] = 0;
            }
            temp[num].flag = true;
            const element = document.getElementById(num);
            element.className='MuiBox-root css-1rqr9y6 wall';
        }
        console.log('all walls generated');
        updateMatrix({paramMatrix:temp});
    }

    const generateBFS = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const targetElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 target')
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        let path = new Array(nodes);
        let reverse = [];

        for(let i = 0; i < path.length; ++i){
            path[i] = null;
        }

        await BFS(temp, startId, targetId, path);
        
        for(let i = targetId; i !== null; i = path[i]){
            reverse.push(i);
        }
        
        for(let i = reverse.length-2; i > 0; --i){
            await new Promise(resolve => setTimeout(resolve));
            const tempElement = document.getElementById(reverse[i]);
            tempElement.className = 'MuiBox-root css-1rqr9y6 path'
        }

        console.log('done');
    }

    const BFS =  async (matrix, start, target, path) => {
        
        const visited = new Array(nodes);

        for(let i = 0; i < visited.length; ++i){
            visited[i] = false;
        }
        
        let q = [];
        q.push(start);

        visited[start] = true;
        let vis = 0;
        let string = '';

        while(!(q.length < 1)){
            await new Promise(resolve => setTimeout(resolve));
            vis = q[0];
            string += vis + ' ';            
            q = q.slice(1);

            for(let i = 0; i < nodes; ++i){
                if((matrix[vis][i] === 1) && !(visited[i])){
                    await new Promise(resolve => setTimeout(resolve));
                    if(i === target){
                        path[i] = vis;
                        console.log('Found the target');
                        return;
                    }
                    const element = document.getElementById(i);
                    element.className = 'MuiBox-root css-1rqr9y6 searching';
                    q.push(i);
                    path[i] = vis;
                    visited[i] = true;
                }
            }            
        }
        console.log(string);
    }

    const generateDFS = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const targetElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 target')
        
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        const visitedArr = new Array(nodes);

        let string = '';
        let path = new Array(nodes);
        let reverse = [];

        for(let i = 0; i < path.length; ++i){
            path[i] = null;
        }

        for(let i = 0; i < visitedArr.length; ++i){
            visitedArr[i] = false;
        }
        
        await DFS(temp, startId, targetId, visitedArr, string, path);      

        for(let i = path[targetId]; i !== null ; i = path[i]){
            reverse.push(i);            
        }

        for(let i = reverse.length-1; i > -1; --i){
            await new Promise(resolve => setTimeout(resolve), 1000);
            const tempElement = document.getElementById(reverse[i]);
            tempElement.className = 'MuiBox-root css-1rqr9y6 path';
        }
    }

    const DFS = async (matrix, start, target, visited, string, path) => {        
        await new Promise(resolve => setTimeout(resolve));
        let flag = false;
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const startId = parseInt(startElement[0].id);

        //So the starting node doesn't change colour
        if(visited[startId] === false){
            flag = true;
        }

        string += start + ' ';
        visited[start] = true;
        if(matrix[start].length > 0){
            for(let i = 0; i < matrix[start].length-1; ++i){
                if((matrix[start][i] === 1) && (!visited[i])){
                    await new Promise(resolve => setTimeout(resolve),1000);
                    if(stopFlag === true){
                        return;
                    }
                    if(start === target){
                        console.log('Found the target');
                        stopFlag = true;
                        path[i] = start;
                        return;
                    }
                    if(!flag){
                        const element = document.getElementById(start);
                        element.className = 'MuiBox-root css-1rqr9y6 searching';
                        path[i] = start;
                    }
                    await DFS(matrix, i, target, visited, string, path);
                }
            }
        }        
    }

    return(
        <>
            <div className='graph'>
                <br/>

                <Button variant="outlined" onClick={generateBFS} >
                    Breadth First Search
                </Button>
                <Button variant="outlined" onClick={generateDFS} >
                    Depth First Search
                </Button> 
                <Button variant="outlined" onClick={clearMaze} >
                    Clear Maze
                </Button>
                <Button variant="outlined" onClick={generateRandomMaze} >
                    Generate Random Maze
                </Button>
                <br/>
                <br/>
                <label className='legendText'>Legend</label>
                <br/>
                <label className='legendText'> Green = Start, Purple = Target, Red = Walls, Orange = Searching, Blue = Path To Target</label>
                <br/>
                <br/>
            </div>
            <div id='graphBoxContainer' >
            {visibility ? <BoxContainer tableHeight={tableHeight} tableWidth={tableWidth} matrix={paramMatrix}/> : null }
            </div>            
        </>        
    )
}