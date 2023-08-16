import '../components/graph.css'
import { Button, Box } from "@mui/material";
import { BoxContainer } from "./boxContainer";
import React, { useEffect, useState, useRef } from "react";
import { Popup } from './popup';
import { Heap } from 'heap-js';

// const initialWindow = {height: window.innerHeight, width: window.innerWidth};
const tableHeight = 20;
const tableWidth = 49;
const randomSize = 400;
let stopFlag = false;
let showPopupValue = true;

// Create Dijkstra
// Create Johnsons
// Create floyd warshall
// Create Max Flow

// Scale the window length and width to the box size
export const Graph = () => {
    const adjacencyMatrix = [];
    const initialMatrix = {paramMatrix:adjacencyMatrix};
    // const [clearedMatrix, setClearedMatrix] = useState();
    // const [wall, setWall] = useState(false);
    // const [windowDimensions, setWindowDimensions] = useState(initialWindow);
    const [paramMatrix, updateMatrix] = useState(initialMatrix);
    const [visibility, setVisibility] = useState(false);
    const [currentlySearching, setCurrentlySearching] = useState(false);
    const [showPopup, setShowPopup] = useState(showPopupValue);

    const stop = useRef(false);

    const nodes = tableHeight*tableWidth;

    useEffect(() =>{
        setTimeout(() =>{
            setVisibility(true);
            showMarkers();
        }, 1000);

        generateMaze();        
        // console.log(adjacencyMatrix);
        // setClearedMatrix(adjacencyMatrix);
        updateMatrix({paramMatrix:adjacencyMatrix});
        console.log('starting');
    }, [])

    useEffect(() => {
        if (showPopup === false) {
            showPopupValue = false;
        }
    }, [showPopup]);

    // Handles whenever the window resizes
    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowDimensions({height: window.innerHeight, width: window.innerWidth})
    //     }
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
        
    // });

    // console.log(windowDimensions.height, windowDimensions.width);    

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
        element.className = element.className.concat(' starting');
        num = (10*tableWidth+40);
        element = document.getElementById(num);
        element.className = element.className.concat(' target');
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
        const startId = parseInt(document.getElementsByClassName('starting')[0].id);
        const targetId = parseInt(document.getElementsByClassName('target')[0].id);
        
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
            element.className = element.className.concat(' wall');
        }
        console.log('all walls generated');
        updateMatrix({paramMatrix:temp});
    }

    const needReset = () => {
        const searching = document.getElementsByClassName('searching');
        const path = document.getElementsByClassName('path');

        return (searching.length + path.length) !== 0;
    }

    const clearSearch = () => {
        const searching = document.getElementsByClassName('searching');
        const path = document.getElementsByClassName('path');
        
        while (searching.length > 0) {
            searching[0].className = searching[0].className.replace(' searching', '');
        }
        
        while (path.length > 0) {
            path[0].className = path[0].className.replace(' path', '');
        }
    }

    const searchHandler = async (algorithm) => {
        if (currentlySearching) {
            stop.current = true;
            setCurrentlySearching(false);
            return;
        } else {
            if (needReset()) {
                await clearSearch();
            }
            stop.current = false;
            setCurrentlySearching(true);
        }
        switch (algorithm) {
            case 'bfs':
                await generateBFS();
                break;
            case 'dfs':
                await generateDFS();
                break;
            case 'A*':
                await generateAStar();
            default:
                break;
        }
        stop.current = false;
        setCurrentlySearching(false);
    }

    const generateBFS = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('starting');
        const targetElement = document.getElementsByClassName('target');
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        let path = new Array(nodes);
        let reverse = [];

        for(let i = 0; i < path.length; ++i){
            path[i] = null;
        }

        await BFS(temp, startId, targetId, path);
        
        for(let i = targetId; i !== null; i = path[i]){
            if (stop.current) return;
            reverse.push(i);
        }
        
        for(let i = reverse.length-2; i > 0; --i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve));
            const tempElement = document.getElementById(reverse[i]);
            tempElement.className = tempElement.className.concat(' path');
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
            if (stop.current) return;
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
                    element.className = element.className.concat(' searching');
                    q.push(i);
                    path[i] = vis;
                    visited[i] = true;
                }
            }            
        }
    }

    const generateDFS = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName(' starting');
        const targetElement = document.getElementsByClassName(' target')
        
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
            if (stop.current) return;
            reverse.push(i);            
        }

        for(let i = reverse.length-1; i > -1; --i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve), 1000);
            const tempElement = document.getElementById(reverse[i]);
            tempElement.className = tempElement.className.concat(' path');
        }
    }

    const DFS = async (matrix, start, target, visited, string, path) => {    
        if (stop.current) return;    
        await new Promise(resolve => setTimeout(resolve));
        let flag = false;
        const startElement = document.getElementsByClassName('starting');
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
                        element.className = element.className.concat(' searching');
                        path[i] = start;
                    }
                    await DFS(matrix, i, target, visited, string, path);
                }
            }
        }        
    }

    const generateAStar = async () => {
        const temp = paramMatrix.paramMatrix;
        const startElement = document.getElementsByClassName('starting');
        const targetElement = document.getElementsByClassName('target');
        const startId = parseInt(startElement[0].id);
        const targetId = parseInt(targetElement[0].id);
        let path = new Array(nodes);
        let reverse = [];

        for(let i = 0; i < path.length; ++i){
            path[i] = null;
        }

        await aStar(temp, startId, targetId, path)

        for(let i = targetId; i !== null; i = path[i]){
            if (stop.current) return;
            reverse.push(i);
        }
        
        for(let i = reverse.length-2; i > 0; --i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve));
            const tempElement = document.getElementById(reverse[i]);
            tempElement.className = tempElement.className.concat(' path');
        }

        console.log('done');
    }

    const aStar = async (matrix, start, target, path) => {
        const visited = new Array(nodes);
        const costs = new Array(nodes);

        const target_x = target % tableWidth;
        const target_y = Math.floor(target/tableWidth);

        for(let i = 0; i < visited.length; ++i){
            costs[i] = -1;
            visited[i] = false;
        }
        costs[start] = 0;
        visited[start] = true;
        
        const customPriorityComparator = (a, b) => a.priority - b.priority;
        const minHeap = new Heap(customPriorityComparator);
        minHeap.init([]);
        minHeap.push({val: start, priority: 0});

        while (minHeap.size() > 0) {
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve));

            const popped = minHeap.pop().val;
            const curCost = costs[popped];
            
            const element = document.getElementById(popped);
            if (!element.className.includes('starting') && !element.className.includes('target')) {
                element.className = element.className.concat(' searching');
            }

            for(let i = 0; i < nodes; ++i){
                if((matrix[popped][i] === 1) && !(visited[i])){
                    await new Promise(resolve => setTimeout(resolve));
                    if(i === target){
                        path[i] = popped;
                        return;
                    } 
                    const y = Math.floor(i/tableWidth)
                    const x = i % tableWidth;

                    const realCost = curCost + 1
                    const fCost = realCost + Math.abs(target_x - x) + Math.abs(target_y - y);

                    minHeap.push({val: i, priority: fCost});
                    path[i] = popped;
                    visited[i] = true;
                }
            }
        }
    }

    return(
        <>
            <Popup parameters={{open: showPopup, setOpen: setShowPopup, titleText: 'Hint', descriptionText: 'Drag inside the box to create walls or use the Generate Random Maze button. You can even move the Start and End nodes! Then select an algorithm!'}} />
            <div className='graph'>
                <br/>

                <Button variant="outlined" onClick={() => searchHandler('bfs')} >
                    {currentlySearching ? 'Stop' : 'Breadth First Search'}
                </Button>
                {currentlySearching ? null :
                    <>
                        <Button variant="outlined" onClick={() => searchHandler('dfs')} >
                            Depth First Search
                        </Button> 
                        <Button variant="outlined" onClick={() => searchHandler('A*')} >
                            A*
                        </Button> 
                        <Button variant="outlined" onClick={clearMaze} >
                            Clear Maze
                        </Button>
                        <Button variant="outlined" onClick={generateRandomMaze} >
                            Generate Random Maze
                        </Button>
                        <Button variant="outlined" onClick={() => setShowPopup(true)} >
                            Hint
                        </Button>
                    </>
                }
                <br/>
                <br/>
                <label className='legendText'>Legend</label>
                <br/>
                <div className='legendContent'>
                    <Box className='legendBox' sx={{display:'flex', justifyContent: 'center', border: '1px solid grey', backgroundColor: '#BFE45D', marginRight: '0.5rem'}} />
                    <label className='legendText'> 
                        : Start
                    </label>
                    <Box className='legendBox' sx={{display:'flex', justifyContent: 'center', border: '1px solid grey', backgroundColor: '#D436CA', marginRight: '0.5rem', marginLeft: '0.5rem'}} />
                    <label className='legendText'>
                        : Target
                    </label>
                    {/* <Box className='legendBox' sx={{display:'flex', justifyContent: 'center', border: '1px solid grey', backgroundColor: '#414141', marginRight: '0.5rem', marginLeft: '0.5rem'}} />
                    <label className='legendText'>
                        : Walls
                    </label>
                    <Box className='legendBox' sx={{display:'flex', justifyContent: 'center', border: '1px solid grey', backgroundColor: '#E19223', marginRight: '0.5rem', marginLeft: '0.5rem'}} />
                    <label className='legendText'>
                        : Searching
                    </label>
                    <Box className='legendBox' sx={{display:'flex', justifyContent: 'center', border: '1px solid grey', backgroundColor: '#4D57D2', marginRight: '0.5rem', marginLeft: '0.5rem'}} />
                    <label className='legendText'>
                        : Path
                    </label> */}
                </div>
                <br/>
            </div>
            <div id='graphBoxContainer' >
            {visibility ? <BoxContainer tableHeight={tableHeight} tableWidth={tableWidth} matrix={paramMatrix}/> : null }
            </div>            
        </>        
    )
}