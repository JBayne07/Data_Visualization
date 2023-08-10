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

        //Determines if you clicked on a wall or not, so the program determines if the user will clear the walls or add walls to the maze
        if(element.className.includes('starting') || element.className.includes('target')){
            startTargetFlag = true;
        }else if(element.className.includes('wall')){
            wallFlag = true;
            startTargetFlag = false;
        }else{
            wallFlag = false;
            startTargetFlag = false;
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
        }else if(originalElement.className.includes('starting')){
            element.className = element.className.replace(' target', '').replace(' searching', '').replace(' path', '').replace(' wall', '').concat(' starting');
            originalElement.className = originalElement.className.replace('starting', '');
        }else if(originalElement.className.includes('target')){
            element.className = element.className.replace(' starting', '').replace(' searching', '').replace(' path', '').replace(' wall', '').concat(' target');
            originalElement.className = originalElement.className.replace('target', '');
        }
    }

    const dragOverBox = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        let element = document.getElementById(event.target.id);        

        if(element.className.includes('starting') || element.className.includes('target')){
            return;
        }
        console.log(element.className, element.id);
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
            element.className = element.className.replace(' starting', '').replace(' target', '').replace(' searching', '').replace(' path', '').replace(' wall', '');
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
            if (!element.className.includes('wall')) {
                element.className = element.className.replace(' starting', '').replace(' target', '').replace(' searching', '').replace(' path', '').concat(' wall');
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
        }
    }
    
    return(
        <Box className='box' id={props.id} draggable onClick={changeWall} onDragStart={dragBox} onDragOver={dragOverBox} onDrop={dropBox} sx={{display:'flex', justifyContent: 'center', border: '1px solid grey'}}/>
    )
}