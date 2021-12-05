import './graphBox.css'
import {Box} from '@mui/system'
import React, { useEffect, useState } from "react";

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

    const changeWall = async () =>{
        element = document.getElementById(props.id);
        if(wall){
            await setClassName(wall, element);
            await setWall(false);
        }else{
            await setClassName(wall, element);
            await setWall(true);
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
        props.passChildData(temp);
    }
    
    return(
        <Box id={props.id} onClick={changeWall} sx={{width:5, height:5, p:2, display: 'flex', justifyContent: 'center', border: '1px solid grey'}}/>
    )
}