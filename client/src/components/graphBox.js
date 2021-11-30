import './graphBox.css'
import {Box} from '@mui/system'
import { useEffect, useState } from "react";

// Find a way to update wall when graph.js generate a random maze

export const GraphBox = ({id, flag}) =>{
    const [wall, setWall] = useState(false);
    let element;
    setTimeout(() =>{
        element = document.getElementById(id);
        
    }, 1000)

    useEffect(() => {
        if(flag){
            console.log('true hi');
            setWall(true);
        }else{
            console.log('false hie');
            setWall(false);
        }     
    }, [flag])

    
    const changeWall = async () =>{
        element = document.getElementById(id);
        if(wall){
            await setClassName(wall, element);
            await setWall(false);
        }else{
            await setClassName(wall, element);
            await setWall(true);
        }
    }

    const setClassName = (flag, element) => {
        if(flag){
            element.className = 'MuiBox-root css-1rqr9y6'
        }else{
            element.className = 'MuiBox-root css-1rqr9y6 wall'
        }
    }
    return(
        <Box id={id} onClick={changeWall} sx={{width:5, height:5, p:2, display: 'flex', justifyContent: 'center', border: '1px solid grey'}}/>
    )
}