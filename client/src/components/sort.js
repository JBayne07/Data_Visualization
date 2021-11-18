import { BarContainer } from "./barContainer";
import { Button } from "@mui/material";
import './sort.css'
import { useEffect, useCallback, useState } from "react";
let list = [];

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

    useEffect ( async () => {
        console.log("hi page loaded");
        fetch('http://localhost:9000/api/numbers',{
            method: 'GET'
        })
        .then(response => response.json())        
        .then(data => list = data.array[0])
        .then(() => console.log('frontend: ' ,list))
        }, [])
    
    const initialParameters = {paramArr:list};

    const [parameters, setParameters] = useState(
        initialParameters
    );
    
    // Need to add visibility state when rendering the bar container component

    const [visibility, setVisibility] = useState(false);

    const showData = (list) => {
        // initialMousePosition={array:list};
        // const [mousePosition, setMousePosition] = useState(
        //     initialMousePosition
        //   );
        setParameters({paramArr:list});
        console.log('hi:',list);
        // console.log(list[0].value);
    }

    return(

        <div className='sort' >
            
            <br/>

            <Button variant="outlined" onClick={bubbleSort} >
                Bubble
            </Button>

            <Button variant="outlined" onClick={() => showData(list)} >
                Show Data
            </Button>

            <br/>
            <br/>
            
            {/* <BarContainer paramArr={parameters}/> */}

        </div>
    );    
}