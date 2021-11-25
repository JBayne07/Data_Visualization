import {Box} from '@mui/system'
import './boxRow.css'

export const BoxRow = ({num, tableWidth}) =>{
    // const rowLength = Math.floor(windowWidth/39);
    // console.log(rowLength);
    const array = new Array(tableWidth);
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