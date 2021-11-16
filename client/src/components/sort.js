import { Bar } from "./bar";
import { Button } from "@mui/material";
import './sort.css'
import { useEffect } from "react";
let list = [];
let width = 5;

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

const showData = ({list}) => {
    // initialMousePosition={array:list};
    // const [mousePosition, setMousePosition] = useState(
    //     initialMousePosition
    //   );

    console.log(list[0].value);
    for(let i = 0; i < 20; ++i){
        
    }
}

export const Sort = () => {
    useEffect (() => {
        console.log("hi page loaded");
        fetch('http://localhost:9000/api/numbers',{
            method: 'GET'
        })
        .then(response => response.json())        
        .then(data => list = data.array[0])
        .then(() => console.log('frontend: ' ,list))
        }, [])
    
    
    return(

        <div className='sort' >
            
            <br/>

            <Button variant="outlined" onClick={bubbleSort} >
                Bubble
            </Button>

            <Button variant="outlined" onClick={showData} >
                Show Data
            </Button>

            <br/>
            <br/>
            {list.map(index =>(
                <Bar height={index.value/1000} width={width}/>
            ))}

                <Bar height='750' width={width}/>
                <Bar height='250' width={width}/>
                <Bar height='550' width={width}/>
        </div>
    );    
}