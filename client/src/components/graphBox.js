import './graphBox.css'
import {Box} from '@mui/system' 
import React, { useEffect, useState } from "react";

let startTargetFlag = false;
let wallFlag = true;

export const GraphBox = (props) =>{
    const [wall, setWall] = useState(false);
    let element;
    setTimeout(() =>{
        element = document.getElementById(props.id);
    }, 1000)

    useEffect(() => {
        if(props.flag){
            setWall(true);
        }else{
            setWall(false);
        }
    }, [props.flag])

    const changeWall = () =>{
        element = document.getElementById(props.id);
        if(wall){
            setClassName(wall, element);
            setWall(false);
        }else{
            setClassName(wall, element);
            setWall(true);
        }
    }

    const dragBox = event => {        
        event.dataTransfer.setData("id", props.id)
        let element = document.getElementById(props.id);
        startTargetFlag = false;       

        //Determines if you clicked on a wall or not, so the program determines if the user will clear the walls or add walls to the maze
        if(element.className === 'MuiBox-root css-1rqr9y6 wall'){
            wallFlag = true;
        }else{
            wallFlag = false;
        }
    }

    const dropBox = event => {
        event.stopPropagation();
        event.preventDefault();

        let element = document.getElementById(event.target.id);
        let originalElement = document.getElementById(event.dataTransfer.getData("id"));
        //Moves the starting target to where it was dropped and makes the original place become an empty box
        if(originalElement.className === element.className){
            return;
        }else if(originalElement.className === 'MuiBox-root css-1rqr9y6 starting'){
            element.className = 'MuiBox-root css-1rqr9y6 starting';
            originalElement.className = 'MuiBox-root css-1rqr9y6';
        }else if(originalElement.className === 'MuiBox-root css-1rqr9y6 target'){
            element.className = 'MuiBox-root css-1rqr9y6 target';
            originalElement.className = 'MuiBox-root css-1rqr9y6';
        }
    }

    const dragOverBox = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        let element = document.getElementById(event.target.id);       

        if((element.className === 'MuiBox-root css-1rqr9y6 starting') || (element.className === 'MuiBox-root css-1rqr9y6 target')){
            startTargetFlag = true;
            return;
        }

        if(!startTargetFlag){
            if(wallFlag){
                setClassName(true, element);
                setWall(false);
            }else{
                setClassName(false, element);
                setWall(true);
            }
        }
    }

    const setClassName = (flag, element) => {
        const temp = [...props.matrix.paramMatrix];
        const num = props.id;
        const tableWidth = props.tableWidth;
        const nodes = props.tableWidth * props.tableHeight;
        if(flag){
            element.className = 'MuiBox-root css-1rqr9y6';
            if( num >= 0 && num <= tableWidth-1){
                if(num === 0){
                    temp[num+1][num] = 1;
                    temp[num+tableWidth][num] = 1;
                }else if (num === tableWidth - 1) {
                    temp[num-1][num] = 1;
                    temp[num+tableWidth][num] = 1;
                }else {
                    temp[num-1][num] = 1;
                    temp[num+1][num] = 1;
                    temp[num+tableWidth][num] = 1;
                }
            }
            if(num >= nodes-tableWidth && num <= nodes-1){
                if(num === nodes - tableWidth){
                    temp[num+1][num] = 1;
                    temp[num-tableWidth][num] = 1;
                }else if(num === nodes-1){
                    temp[num-1][num] = 1;
                    temp[num-tableWidth][num] = 1;
                }else{
                    temp[num-1][num] = 1;
                    temp[num+1][num] = 1;
                    temp[num-tableWidth][num] = 1;
                }
            }
            if(0 === num % tableWidth){
                if(num === 0){
                    temp[num+1][num] = 1;
                    temp[num + tableWidth][num] = 1;
                }else if(num === nodes - tableWidth){
                    temp[num+1][num] = 1;
                    temp[num - tableWidth][num] = 1;
                }else{                    
                    temp[num+1][num] = 1;
                    temp[num + tableWidth][num] = 1;
                    temp[num - tableWidth][num] = 1;
                }
            }
            if(48 === num % tableWidth){
                if(num === tableWidth-1){
                    temp[num-1][num] = 1;
                    temp[num+tableWidth][num] = 1;
                }else if(num === nodes-1){
                    temp[num-1][num] = 1;
                    temp[num-tableWidth][num] = 1;
                }else{
                    temp[num-1][num] = 1;
                    temp[num+tableWidth][num] = 1;
                    temp[num-tableWidth][num] = 1;
                }
            }
            if(!( (num>= 0 && num <= tableWidth-1) || (num >= nodes-tableWidth && num <= nodes-1) || (0 === num % tableWidth) || (48 === num % tableWidth))){
                temp[num+1][num] = 1;
                temp[num-1][num] = 1;
                temp[num+tableWidth][num] = 1;
                temp[num-tableWidth][num] = 1;
            }
        }else{
            element.className = 'MuiBox-root css-1rqr9y6 wall';          
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
        }
    }
    
    return(
        <Box id={props.id} draggable onClick={changeWall} onDragStart={dragBox} onDragOver={dragOverBox} onDrop={dropBox} sx={{width:5, height:5, p:2, justifyContent: 'center', border: '1px solid grey'}}/>
    )
}