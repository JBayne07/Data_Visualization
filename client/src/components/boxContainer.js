import {BoxRow} from './boxRow'
import React from 'react';

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
            {array.map((element) => {
                return(                    
                    <BoxRow num={element} onDrop={dropBox} tableHeight={props.tableHeight} tableWidth={props.tableWidth} matrix={props.matrix}/>
                )
            })}
        </div>        
    )    
}