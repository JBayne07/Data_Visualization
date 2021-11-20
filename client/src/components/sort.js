import { BarContainer } from "./barContainer";
import { Button, Slider, Box } from "@mui/material";
import './sort.css'
import { useEffect, useState } from "react";
let totalArr = [];
let arr = [];
let shuffledArr = [];
const initialParameters = {paramArr:totalArr};

// Need to add, adjust data size bar
// Need to add colour to a specific bar being moved
// Add a another value to array, example: array.colour, because there is already array.value, then update the array.colour where setParameters is
// Need to add animation to make it look better

export const Sort = () => {    

    useEffect (() => {
        console.log("hi page loaded");
        fetch('http://localhost:9000/api/numbers',{
            method: 'GET'
        })
        .then(response => response.json())        
        .then(data => totalArr = data.array[0])
        .then(() => console.log('frontend: ' , totalArr))
        }, [])    

    const [parameters, setParameters] = useState(
        initialParameters
    );

    const [visibility, setVisibility] = useState(false);

    const [size, setSize] = useState(50);

    const showData = (array) => {
        shuffledArr = array.sort(() => 0.5 - Math.random());
        arr = shuffledArr.slice(0,250*(size/100));
        for(let i = 0; i < arr.length; ++i){
            arr[i].colour = "black";
        }
        console.log(size);
        setVisibility(true);
        setParameters({paramArr:arr});
    }
    
    const hideData = () => {        
        setVisibility(false);
    }

    const changeSize = (event, newSize) =>{
        setSize(newSize)
    }

    const bubbleSort = (array) => {
        let c = array[0].colour;
        if(visibility){
            for(let i = 0; i < array.length; ++i){
                for(let j = 0; j < array.length-i-1; ++j){                    
                    setTimeout(() => {
                        if(array[j].value > array[j+1].value){
                            let temp = array[j].value;
                            array[j].value = array[j+1].value;
                            array[j+1].value = temp;
                            array[j+1].colour = "green";
                            array[j].colour = c;
                        }else{
                            array[j].colour = c;
                        }
                        if(j === array.length-i-2){
                            array[j+1].colour = "pink";
                        }
                        if(i === array.length-2){
                            array[0].colour = "pink";
                            setParameters({paramArr:array});
                        }                        
                        setParameters({paramArr:array})                        
                    }, 20)
                }
                
            }            
        }
    }

    const selectionSort = (array) => {

    }

    const mergeSort = (array) => {

    }

    const quickSort = (array) => {
        
    }

    return(

        <div className='sort' >
            
            <br/>
            <Box width="300px">
                <Slider defaultValue={50}  aria-label="Small" valueLabelDisplay="auto" onChange={changeSize}></Slider>
            </Box>

            <Button variant="outlined" onClick={() => bubbleSort(arr)} >
                Bubble
            </Button>

            <Button variant="outlined" onClick={() => showData(totalArr)} >
                Show Data
            </Button>

            <Button variant="outlined" onClick={hideData} >
                Hide Data
            </Button>

            <br/>
            <br/>
            {visibility ? <BarContainer parameters={parameters}/> : null}

        </div>
    );    
}