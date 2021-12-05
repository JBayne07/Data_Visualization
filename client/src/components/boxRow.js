import {GraphBox} from './graphBox';
import React, {useEffect, useState} from 'react';
import './boxRow.css';

export const BoxRow = (props) =>{
    // const rowLength = Math.floor(windowWidth/39);
    // console.log(rowLength);
    const [childData, setChildData] = useState();
    const array = new Array(props.tableWidth);
    for(let i = 0; i < array.length; ++i){
        array[i] = props.num*props.tableWidth+i;
    }

    useEffect(() => {
        props.passChildData(childData);
    }, [childData, props])
    
    
    return(
        <div className='boxRow'>
            {array.map((element) => {
                // console.log('boxrow numm', element);
                // if(matrix.paramMatrix.length > 980){

                //     console.log('boxrow === 981', matrix.paramMatrix[element][tableWidth*tableHeight+1]);
                // }else{
                //     console.log('boxrow === 980', matrix.paramMatrix[element][tableWidth*tableHeight]);
                // }
                // console.log('before flag: ', element, matrix.paramMatrix[element]);
                // console.log('flag:',matrix.paramMatrix[element].flag);
                return(                    
                    <GraphBox id={element} tableWidth={props.tableWidth} tableHeight={props.tableHeight} flag={props.matrix.paramMatrix[element].flag} matrix={props.matrix} passChildData={setChildData}/>
                )
            })}
        </div>
    )
}