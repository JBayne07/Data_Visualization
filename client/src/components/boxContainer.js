import {BoxRow} from './boxRow'
import React from 'react';
import './boxContainer.css';

export const BoxContainer = (props) => {

    const array = new Array(props.tableHeight);
    for(let i = 0; i < array.length; ++i){
        array[i] = i;
    }

    const dropBox = event => {
        event.stopPropogation()
        event.preventDefault()
        console.log('dropbox');
    }

    return(
        <div className='boxContainer'>
            {array.map((element, index) => {
                return(                    
                    <BoxRow key={`boxContainer${index}`} num={element} onDrop={dropBox} tableHeight={props.tableHeight} tableWidth={props.tableWidth} matrix={props.matrix}/>
                )
            })}
        </div>        
    )    
}