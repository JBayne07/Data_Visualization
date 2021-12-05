import '../components/graph.css'
import { Button } from "@mui/material";
import { BoxContainer } from "./boxContainer";
import React, { useEffect, useState } from "react";
const initialWindow = {height: window.innerHeight, width: window.innerWidth};

const tableHeight = 20;
const tableWidth = 49;
const randomSize = 400;

// Create a datastructure for the maze - done
// Set up a random start point - done
// Set up a random target point - done
// Create BFS
// Create DFS
// Create Dijkstra
// Create Johnsons
// Create floyd warshall
// Create Max Flow
// onClick wall setup - done
// Move starting point (lower priority)
// Move target point (lower priority)

export const Graph = () => {
    const adjacencyMatrix = [];
    const initialMatrix = {paramMatrix:adjacencyMatrix};
    const [childData, setChildData] = useState();
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
        //uncomment and the length for element 979 will make it 1030

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
        console.log(adjacencyMatrix);
        updateMatrix({paramMatrix:adjacencyMatrix});
    }, [])

    useEffect(() => {
        if(childData !== undefined){
            updateMatrix({paramMatrix:childData});
        }
    }, [childData])

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

    const generateRandomMaze = () =>{
        console.log('generate random maze');
        const temp = paramMatrix.paramMatrix;
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
            updateMatrix({paramMatrix:temp});
            const element = document.getElementById(num);
            element.className='MuiBox-root css-1rqr9y6 wall';
        }
    }

    const generateStartingPoint = () => {
        let index = 0;
        while(index < nodes-1){
            const num = Math.round(Math.random()*(nodes-1));
            const element = document.getElementById(num);
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
            const num = Math.round(Math.random()*(nodes-1));
            const element = document.getElementById(num);
            if(element.className !== 'MuiBox-root css-1rqr9y6 wall'){
                element.className='MuiBox-root css-1rqr9y6 target';
                return;
            }
            index++;
        }
    }

    const generateBFS = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const targetElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 target')
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        let path = new Array(nodes);
        let reverse = [];

        await BFS(temp, startId, targetId, path);
        console.log(path);
        
        for(let i = targetId; i != null; i = path[i]){
            console.log(i);
            reverse.push(i);
        }
        
        for(let i = 1; i < reverse.length-1; ++i){
            console.log(i,' ',reverse[i]);
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
        for(let i = 0; i < path.length; ++i){
            path[i] = null;
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
                        path[i] = q[0];
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

    const generateDFS = () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const targetElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 target')
        
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        const visitedArr = new Array(nodes);
        let string = '';
        for(let i = 0; i < visitedArr.length; ++i){
            visitedArr[i] = false;
        }
        
        DFS(temp, startId, targetId, visitedArr, string);
    }

    const DFS = async (matrix, start, target, visited, string) => {        
        await new Promise(resolve => setTimeout(resolve));
        let flag = false
        const startElement = document.getElementsByClassName('MuiBox-root css-1rqr9y6 starting');
        const startId = parseInt(startElement[0].id);
        if(visited[startId] === false){
            flag = true;
        }

        string += start + ' ';
        visited[start] = true;

        for(let i = 0; i < matrix[start].length-1; ++i){
            if((matrix[start][i] === 1) && (!visited[i])){
                await new Promise(resolve => setTimeout(resolve));
                if(start === target){
                    console.log('Found the target');
                    return;
                }
                if(!flag){
                    const element = document.getElementById(start);
                    element.className = 'MuiBox-root css-1rqr9y6 searching';
                }
                await DFS(matrix, i, target, visited, string);
            }
        }
        if(!flag){
            const element = document.getElementById(start);
            element.className = 'MuiBox-root css-1rqr9y6 searching';
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
                <Button variant="outlined" onClick={generateBFS} >
                    Breadth First Search
                </Button>
                <Button variant="outlined" onClick={generateDFS} >
                    Depth First Search
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
            {visibility ? <BoxContainer tableHeight={tableHeight} tableWidth={tableWidth} matrix={paramMatrix} passChildData={setChildData}/> : null }
            </div>            
        </>        
    )
}