import { Bar } from "./bar";
import { Button } from "@mui/material";
import './sort.css'
let list = [];

const componentDidMount = () => {
    fetch('http://localhost:3000/numbers')
    .then(response => response.json())
    .then(data => this.setState({list: data.data}))
}

let array = [0,2,4,5,623,5,5,2,36,88,4,765,3,5637,37];

const bubbleSort = () => {
    
    for(let i = 0; i < array.length; ++i){
        for(let j = 0; j < array.length; ++j){
            if(array[j] > array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
}

export const Sort = () => {
    return(        
        <div className='sort' >
            
            <br/>

            <Button variant="outlined" onClick={bubbleSort} >
                Bubble
            </Button>

            <br/>
            <br/>
            
                <Bar/>
                <Bar/>
                <Bar/>
           
            
        </div>
    );    
}