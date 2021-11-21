import { BarContainer } from "./barContainer";
import { Button, Slider, Box } from "@mui/material";
import './sort.css'
import { useEffect, useState } from "react";
let array = [38, 27, 43, 3, 9, 82, 10]
let totalArr = [];
let arr = [];
let shuffledArr = [];
const initialParameters = {paramArr:totalArr, };

// Need to add animation to make it look better

const swap = (array, num1, num2) => {
    let c = array[0].colour;
    let temp = array[num1].value;
    array[num1].value = array[num2].value;
    array[num2].value = temp;
    array[num2].colour = "green";
    array[num1].colour = c;
}

const merge = (array, left, middle, right) => {
    
}

const mergeSort = (array, left, right) => {
    // let c = array[0].colour;
    if(left>=right){
        return;
    }
    let middle = (left+(right))/2;
    mergeSort(array, left, middle);
    mergeSort(array, middle+1, right);
    merge(array, left, middle, right)
}

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
        arr = shuffledArr.slice(0,225*(size/100));
        for(let i = 0; i < arr.length; ++i){
            arr[i].colour = "black";
        }
        setVisibility(true);
        setParameters({paramArr:arr});
    }
    
    const hideData = () => {        
        setVisibility(false);
    }

    const changeSize = (event, newSize) =>{
        if(newSize !== 100 && newSize !== 0){
            if(visibility){
                setSize(newSize);
                showData(totalArr);
            }
        }
        setSize(newSize);
        
    }

    const bubbleSort = (array) => {
        console.log("bubble");
        let c = array[0].colour;
        if(visibility){
            for(let i = 0; i < array.length; ++i){
                for(let j = 0; j < array.length-i-1; ++j){                    
                    setTimeout(() => {
                        if(array[j].value > array[j+1].value){
                            swap(array, j, j+1)
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
                    }, 1)
                }                
            }            
        }
    }

    const selectionSort = (array) => {
        console.log("selection");
        let minIndex = 0
        let c = array[0].colour;
        if(visibility){            
            for(let i = 0; i < array.length-1; ++i){
                for(let j = i+1; j < array.length; ++j){                                       
                    setTimeout(() => {                        
                        if(j === i+1){
                            // eslint-disable-next-line
                            minIndex = i;
                        }
                        if(array[j].value < array[minIndex].value){
                            array[minIndex].colour = c;
                            // eslint-disable-next-line
                            minIndex = j;
                            array[minIndex].colour = "blue";
                            setParameters({paramArr:array});
                        }
                        
                        if(j === array.length-1){
                            if(i === minIndex){
                                array[i].colour = "pink";
                                setParameters({paramArr: array});
                            }else{
                                let temp = array[i].value;
                                array[i].value = array[minIndex].value;
                                array[minIndex].value = temp;
                                array[i].colour = "pink";
                                array[minIndex].colour = c;
                                setParameters({paramArr: array});  
                            }
                            if(i === array.length-2){
                                array[i+1].colour = "pink";
                                setParameters({paramArr:array});
                            }                                                      
                        }else{
                            array[i].colour = "green";
                        }
                    }, 10)
                }                          
            }
        }        
    }

    const triggerMergeSort = (array) => {
        console.log("merge");
        mergeSort(array, 0, array.length-1);
    }

    const quickSort = (array) => {
        console.log("quick");
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

            <Button variant="outlined" onClick={() => selectionSort(arr)} >
                Selection
            </Button>

            <Button variant="outlined" onClick={() => triggerMergeSort(array)} >
                Merge
            </Button>

            <Button variant="outlined" onClick={() => quickSort(arr)} >
                Quick
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