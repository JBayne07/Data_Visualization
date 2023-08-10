import { BarContainer } from "./barContainer";
import { Button, Slider, Box } from "@mui/material";
import './sort.css';
import React, { useEffect, useState, useRef } from "react";
import {useSpring, useSprings, Spring, animated} from 'react-spring';
// let testArr = [38, 27, 43, 3, 9, 82, 10]
let totalArr = [];
let arr = [];
let shuffledArr = [];
const initialParameters = {paramArr:totalArr};

// Need to add animation to make it look better
// Add, less sleep time when you have larger data and higher sleep time when you have smaller data

const swap = (array, num1, num2) => {
    let c = array[0].colour;
    let temp = array[num1].value;
    array[num1].value = array[num2].value;
    array[num2].value = temp;
    array[num2].colour = "green";
    array[num1].colour = c;
}

export const Sort = () => {    
    const [fetched, setFetched] = useState(false);
    const [currentlySorting, setCurrentlySorting] = useState(false);
    const stop = useRef(false);

    useEffect (() => {
        if (!fetched) {
            fetch('http://localhost:9000/api/numbers',{
                method: 'GET'
            })
            .then(response => response.json())        
            .then(data => totalArr = data.array[0])
            // .then(() => console.log('frontend: ' , totalArr))
            .then(setFetched(true))
            .then(() => resetData(totalArr))
        }
        }, [fetched])    

    const [parameters, setParameters] = useState(
        initialParameters
    );
    
    const [visibility, setVisibility] = useState(false);
    const [size, setSize] = useState(50);

    const visibleProps = useSpring({
        opacity: visibility ? 1 : 0,
        marginLeft: visibility ? 0 : -1000
    });

    const resetData = async (array) => {
        stop.current = true;
        shuffledArr = array.sort(() => 0.5 - Math.random());
        arr = shuffledArr.slice(0,225*(size/100));
        for(let i = 0; i < arr.length; ++i){
            arr[i].colour = "black";
        }
        setVisibility(true);
        setParameters({paramArr:arr});
    }

    const changeSize = (event, newSize) =>{
        if(newSize !== 100 && newSize !== 0){
            if(visibility){
                setSize(newSize);
                resetData(totalArr);
            }
        }
        setSize(newSize);        
    }

    const needReset = () => {
        const x = parameters.paramArr.map((a) => {return a.colour != "black"});
        return x.reduce((p, c) => {return p || c})
    }

    const sortHandler = async (algorithm) => {
        if (currentlySorting) {
            stop.current = true;
            setCurrentlySorting(false);
            return;
        } else {
            if (needReset()) {
                await resetData(totalArr);
            }
            stop.current = false;
            setCurrentlySorting(true);
        }

        switch(algorithm) {
            case 'bubble':
                bubbleSort(arr);
                break;
            case 'selection':
                selectionSort(arr);
                break;
            case 'merge':
                triggerMergeSort(arr);
                break;
            case 'quick':
                triggerQuickSort(arr);
                break;
            case 'heap':
                triggerHeapSort(arr);
                break;
        }
    }

    const bubbleSort = async (array) => {
        let c = array[0].colour;

        for(let i = 0; i < array.length; ++i){
            if (stop.current) break;
            for(let j = 0; j < array.length-i-1; ++j){
                if (stop.current) break;
                await new Promise(resolve => setTimeout(resolve, 0));
                if(array[j].value > array[j+1].value){
                    swap(array, j, j+1)
                }else{
                    array[j].colour = c;
                    setParameters({paramArr:array});
                }
                if(j === array.length-i-2){
                    array[j+1].colour = "pink";
                    setParameters({paramArr:array});
                }
                if(i === array.length-2){
                    array[0].colour = "pink";
                    setParameters({paramArr:array});
                }
                setParameters({paramArr:array})
            }                
        }           
        stop.current = false;
        setCurrentlySorting(false);
    }

    const selectionSort = async (array) => {
        // console.log("selection");
        let minIndex = 0
        let c = array[0].colour;
        // if(visibility){            
        for(let i = 0; i < array.length-1; ++i){
            if (stop.current) break;
            for(let j = i+1; j < array.length; ++j){    
                if (stop.current) break;
                await new Promise(resolve => setTimeout(resolve));
                    // array[j].colour = "grey";
                    // if(j > 1){
                    //     await new Promise(resolve => setTimeout(resolve));
                    //     array[j-1].colour = c;
                    // }
                    
                    if(j === i+1){
                        minIndex = i;
                    }
                    if(array[j].value < array[minIndex].value){
                        array[minIndex].colour = c;
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
                }                 
            }
        // }
        stop.current = false;
        setCurrentlySorting(false);        
    }

    const triggerMergeSort = async (array) => {
        console.log("merge");
        await mergeSort(array, 0, array.length-1);            
        stop.current = false;
        setCurrentlySorting(false);
    }

    const mergeSort = async (array, left, right) => {
        // let c = array[0].colour;
        if (stop.current) return;
        if(left>=right){
            return;
        }
        let middle = Math.round((left+(right-1))/2);

        await mergeSort(array, left, middle);
        await mergeSort(array, middle+1, right);
        await merge(array, left, middle, right);

        if((right - left) === array.length-1){
            for(let i = 0; i < array.length; ++i){
                if (stop.current) break;
                array[i].colour = "pink"
            }
            setParameters({paramArr:array});
        }
        
    }

    const merge = async (array, left, middle, right) => {
        if (stop.current) return;
        let leftLength = middle-left+1;
        let rightLength = right-middle;
        let leftArr = [];
        let rightArr = [];
    
        let leftIndex = 0;
        let rightIndex = 0;
        let mergedIndex = left;
        let colourLength = 0;

        for(let i = 0; i < leftLength; ++i){
            await new Promise(resolve => setTimeout(resolve));
            leftArr.push(array[left+i]);
            array[left+i].colour = "grey";
            setParameters({paramArr: array});
        }
    
        for(let i = 0; i < rightLength; ++i){
            await new Promise(resolve => setTimeout(resolve));
            rightArr.push(array[middle+1+i]);
            array[middle+1+i].colour = "blue";
            setParameters({paramArr: array});
        }
    
        while(leftIndex < leftLength && rightIndex < rightLength){
            await new Promise(resolve => setTimeout(resolve));
            array[mergedIndex].colour = "black"
            if(leftArr[leftIndex].value <= rightArr[rightIndex].value){
                array[mergedIndex] = leftArr[leftIndex];
                leftIndex++;
            }else{
                array[mergedIndex] = rightArr[rightIndex];                
                rightIndex++;
            }                        
            setParameters({paramArr: array});
            mergedIndex++;
            colourLength++;
        }

        while(leftIndex < leftLength){
            await new Promise(resolve => setTimeout(resolve));
            array[mergedIndex].colour = "black"
            array[mergedIndex] = leftArr[leftIndex];            
            leftIndex++;
            mergedIndex++;
            colourLength++;
            setParameters({paramArr: array});
        }

        while(rightIndex < rightLength){
            await new Promise(resolve => setTimeout(resolve));
            array[mergedIndex].colour = "black"
            array[mergedIndex] = rightArr[rightIndex];            
            rightIndex++;
            mergedIndex++;
            colourLength++;
            setParameters({paramArr: array});
        }

        for(let i = left; i < colourLength; ++i){
            array[i].colour = "pink";
        }
        setParameters({paramArr:array});

    }

    const triggerQuickSort = async (array) => {
        console.log("quick");
        await quickSort(array, 0, array.length-1);
        stop.current = false;
        setCurrentlySorting(false);
    }

    const quickSort = async (array, first, last) => {
        if (stop.current) return;
        if(first < last){
            const pivotIndex = await partition(array, first, last);
            await quickSort(array, first, pivotIndex-1);
            await quickSort(array, pivotIndex+1, last);
        }
        if(first === 0 && last === array.length-1){
            array[last].colour = "pink";
            setParameters({paramArr: array});
        }
    }

    const partition = async (array, first, last) => {
        if (stop.current) return;
        const pivot = array[last].value;
        let index = first - 1;

        for(let i = first; i <= last-1; ++i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve));
            if(array[i].value < pivot){
                index++;
                const temp = array[index];
                array[index] = array[i];
                array[i] = temp;
                array[index].colour = "pink";
                setParameters({paramArr: array});
            }
        }
        await new Promise(resolve => setTimeout(resolve));
        const temp = array[index + 1];
        array[index + 1] = array[last];
        array[index + 1].colour = "pink";
        array[last] = temp;
        setParameters({paramArr: array});
        return (index + 1);
    }

    const triggerHeapSort = async (array) => {
        console.log("heap");
        await heapSort(array, array.length);
        stop.current = false;
        setCurrentlySorting(false);
    }

    const heapSort = async (array, length) => {
        for(let i = Math.floor(length/2) - 1; i >= 0; i--) {
            if (stop.current) return;
            await heapify(array, length, i);
        }

        for(let i = length - 1; i > 0; i--) {
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve));
            const temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            array[i].colour = "pink";
            setParameters({paramArr: array});
            await heapify(array, i, 0);
        }
        array[0].colour = "pink";
        setParameters({paramArr: array});
    }

    const heapify = async (array, length, i) => {
        if (stop.current) return;
        let largest = i;
        let l = 2*i + 1;
        let r = 2*i + 2;
        if (l < length && array[l].value > array[largest].value) {
            largest = l;
        }

        if (r < length && array[r].value > array[largest].value) {
            largest = r;
        }

        if (largest !== i) {
            await new Promise(resolve => setTimeout(resolve));

            const temp = array[i];
            array[i] = array[largest];
            array[largest] = temp;
            array[i].colour = "orange";
            array[largest].colour = "grey";
            setParameters({paramArr: array});
            await heapify(arr, length, largest);

            await new Promise(resolve => setTimeout(resolve));
            array[i].colour = "black";
            array[largest].colour = "black";
            setParameters({paramArr: array});            
        } 
    }

    return(
        <>
            <div className='sort' >
                
                <br/>
                <Box width="300px">
                    <Slider defaultValue={50}  aria-label="Small" valueLabelDisplay="auto" onChange={changeSize}>
                        Data Size
                    </Slider>
                </Box>

                <Button variant="outlined" onClick={() => sortHandler('bubble')} >
                    {!currentlySorting ? 'Bubble' : 'Stop'}
                </Button>

                {currentlySorting ? <></> :  (<>
                    <Button variant="outlined" onClick={() => sortHandler('selection')} >
                        Selection
                    </Button>

                    <Button variant="outlined" onClick={() => sortHandler('merge')} >
                        Merge
                    </Button>

                    <Button variant="outlined" onClick={() => sortHandler('quick')} >
                        Quick
                    </Button>

                    <Button variant="outlined" onClick={() => sortHandler('heap')} >
                        Heap
                    </Button>

                    <Button variant="outlined" onClick={() => resetData(totalArr)} >
                        Reset Data
                    </Button>
                </>)}
                
                <br/>
                <br/>
            </div>

            {visibility ? (
                <animated.div id='sortBarContainer' style={visibleProps}>
                    <BarContainer parameters={parameters}/>
                </animated.div>
            ) : (
                <animated.div id='sortBarContainer' style={visibleProps}>
                    <BarContainer parameters={parameters}/>
                </animated.div>
            )}
        </>
        
    );    
}