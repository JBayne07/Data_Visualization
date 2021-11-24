import {Box} from '@mui/system'
import './boxRow.css'

export const BoxRow = ({num}) =>{
    const array = new Array(49);
    for(let i = 0; i < array.length; ++i){
        array[i] = num+'-'+i;
    }
    return(
        <div className='boxRow'>
            {array.map((element) => {
                return(                    
                    <Box id={element} sx={{width:5, height:5, p:2, display: 'flex', justifyContent: 'center', border: '1px solid grey'}}/>
                )
            })}
        </div>
    )
}