import {GraphBox} from './graphBox'
import './boxRow.css'

export const BoxRow = ({num, tableHeight, tableWidth, matrix}) =>{
    // const rowLength = Math.floor(windowWidth/39);
    // console.log(rowLength);
    const array = new Array(tableWidth);
    for(let i = 0; i < array.length; ++i){
        array[i] = num*tableWidth+i;
    }
    
    // console.log('boxrow1',matrix.paramMatrix[0][0])
    // console.log('boxrow2',matrix.paramMatrix[49][980])
    // console.log('boxrow3',matrix.paramMatrix[98][980])
    // console.log('boxrow4',matrix.paramMatrix[147][980])
    // console.log('boxrow5',matrix.paramMatrix[196][980])
    // console.log('boxrow6',matrix.paramMatrix[245][980])
    // console.log('boxrow7',matrix.paramMatrix[294][980])
    // console.log('boxrow8',matrix.paramMatrix[343][980])
    // console.log('boxrow9',matrix.paramMatrix[392][980])
    // console.log('boxrow10',matrix.paramMatrix[441][980])
    // console.log('boxrow11',matrix.paramMatrix[490][980])
    // console.log('boxrow12',matrix.paramMatrix[539][980])
    // console.log('boxrow13',matrix.paramMatrix[588][980])
    // console.log('boxrow14',matrix.paramMatrix[637][980])
    // console.log('boxrow15',matrix.paramMatrix[686][980])
    // console.log('boxrow16',matrix.paramMatrix[735][980])
    // console.log('boxrow17',matrix.paramMatrix[784][980])
    // console.log('boxrow18',matrix.paramMatrix[833][980])
    // console.log('boxrow19',matrix.paramMatrix[882][980])
    // console.log('boxrow20',matrix.paramMatrix[931][tableHeight*tableWidth+1])
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
                    <GraphBox id={element} flag={matrix.paramMatrix[element].flag}/>
                )
            })}
        </div>
    )
}