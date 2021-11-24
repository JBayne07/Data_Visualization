import {BoxRow} from './boxRow'

export const BoxContainer = () => {
    const array = new Array(20);
    for(let i = 0; i < array.length; ++i){
        array[i] = i;
    }
    return(
        <div className='boxContainer'>
            {array.map((element) => {
                return(                    
                    <BoxRow num={element}/>
                )
            })}
        </div>        
    )    
}