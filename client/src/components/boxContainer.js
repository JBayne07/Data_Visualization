import {BoxRow} from './boxRow'
import React, {useEffect, useState} from 'react';

export const BoxContainer = (props) => {
    // const columnHeight = 
    const [childData, setChildData] = useState();

    const array = new Array(props.tableHeight);
    for(let i = 0; i < array.length; ++i){
        array[i] = i;
    }
    useEffect(() => {        
        props.passChildData(childData);
    }, [childData, props])

    const dropBox = event => {
        event.stopPropogation()
        event.preventDefault()
        console.log('dropbox');
    }

    return(
        <div className='boxContainer'>
            {array.map((element) => {
                return(                    
                    <BoxRow num={element} onDrop={dropBox} tableHeight={props.tableHeight} tableWidth={props.tableWidth} matrix={props.matrix} passChildData={setChildData}/>
                )
            })}
        </div>        
    )    
}