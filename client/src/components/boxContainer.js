import {BoxRow} from './boxRow'

export const BoxContainer = ({tableHeight, tableWidth}) => {
    // const columnHeight = 
    const array = new Array(tableHeight);
    for(let i = 0; i < array.length; ++i){
        array[i] = i;
    }
    return(
        <div className='boxContainer'>
            {array.map((element) => {
                return(                    
                    <BoxRow num={element} tableWidth={tableWidth}/>
                )
            })}
        </div>        
    )    
}