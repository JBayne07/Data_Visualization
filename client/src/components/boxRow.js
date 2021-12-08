import {GraphBox} from './graphBox';
import React from 'react';
import './boxRow.css';

export const BoxRow = (props) =>{
    const array = new Array(props.tableWidth);
    for(let i = 0; i < array.length; ++i){
        array[i] = props.num*props.tableWidth+i;
    }    
    
    return(
        <div className='boxRow'>
            {array.map((element) => {
                return(                    
                    <GraphBox id={element} tableWidth={props.tableWidth} tableHeight={props.tableHeight} flag={props.matrix.paramMatrix[element].flag} matrix={props.matrix}/>
                )
            })}
        </div>
    )
}