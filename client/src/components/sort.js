import { BarContainer } from "./barContainer";
import { Popup } from "./popup";
import { Button, Slider, Box, Typography } from "@mui/material";
import './sort.css';
import React, { useEffect, useState, useRef, useReducer } from "react";
import {useSpring, useSprings, Spring, animated} from 'react-spring';
// let testArr = [38, 27, 43, 3, 9, 82, 10]
let totalArr = [];
let arr = [];
let shuffledArr = [];
const initialParameters = {paramArr:totalArr};

// Need to add animation to make it look better
// Add, less sleep time when you have larger data and higher sleep time when you have smaller data

let showPopupValue = true;

export const Sort = () => {    
    const [fetched, setFetched] = useState(false);
    const [currentlySorting, setCurrentlySorting] = useState(false);
    const [openPopup, setOpenPopup] = useState(showPopupValue);
    const [speed, setSpeed] = useState(0);
    const stop = useRef(false);

    useEffect(() => {
        if (openPopup === false) {
            showPopupValue = false;
        }
    }, [openPopup]);

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
        marginLeft: visibility ? 20 : -1000
    });

    const resetData = async (array) => {
        stop.current = true;
        shuffledArr = array.sort(() => 0.5 - Math.random());
        arr = shuffledArr.slice(0,50*(size/100));
        for(let i = 0; i < arr.length; ++i){
            arr[i].colour = "black";
        }
        setVisibility(true);
        setParameters({paramArr:arr});
    };

    const changeSize = (event, newSize) => {
        setSize(Math.max(4, newSize));
        resetData(totalArr);     
    };

    const changeSpeed = (event, newSpeed) => {
        setSpeed(300 - newSpeed*3);
        console.log('setting speed', speed);
    };

    const needReset = () => {
        const x = parameters.paramArr.map((a) => {return a.colour !== "black"});
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
            default:
                break;
        }
    }

    const swap = async (array, num1, num2) => {
        let c = array[0].colour;
        let temp = array[num1].value;
        array[num1].value = array[num2].value;
        array[num2].value = temp;
        array[num2].colour = "pink";
        array[num1].colour = "pink";
        
        setParameters({paramArr:array});

        await new Promise(resolve => setTimeout(resolve, speed));

        array[num1].colour = c;
    }

    const bubbleSort = async (array) => {
        let c = array[0].colour;

        for(let i = 0; i < array.length; ++i){
            if (stop.current) break;
            for(let j = 0; j < array.length-i-1; ++j){
                if (stop.current) break;

                array[j].colour = "orange";
                setParameters({paramArr:array});
                
                await new Promise(resolve => setTimeout(resolve, speed));

                array[j].colour = c;

                if(array[j].value > array[j+1].value){
                    await swap(array, j, j+1);
                    setParameters({paramArr:array});
                }else{
                    array[j].colour = c;
                    setParameters({paramArr:array});
                }
                if(j === array.length-i-2){
                    array[j+1].colour = "green";
                    setParameters({paramArr:array});
                }
                if(i === array.length-2){
                    array[0].colour = "green";
                    setParameters({paramArr:array});
                }
                setParameters({paramArr:array})
            }    
        }           
        stop.current = false;
        setCurrentlySorting(false);
    }

    const selectionSort = async (array) => {
        let minIndex = 0
        let c = array[0].colour;
        for(let i = 0; i < array.length-1; ++i){
            if (stop.current) break;
            for(let j = i+1; j < array.length; ++j){    
                if (stop.current) break;
                array[j].colour = "orange";
                setParameters({paramArr:array});
                await new Promise(resolve => setTimeout(resolve, speed));
                array[j].colour = c;
                    
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
                        array[i].colour = "green";
                        setParameters({paramArr: array});
                    }else{
                        await swap(array, i, minIndex);
                        array[i].colour = "green";
                        array[minIndex].colour = c;
                        setParameters({paramArr: array});  
                    }
                    if(i === array.length-2){
                        array[i+1].colour = "green";
                        setParameters({paramArr:array});
                    }
                }
            }                 
        }
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
        if (stop.current) return;
        if(left>=right){
            return;
        }
        let middle = Math.round((left+(right-1))/2);

        await mergeSort(array, left, middle);
        await mergeSort(array, middle+1, right);
        await merge(array, left, middle, right);
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

        for(let i = 0; i < leftLength; ++i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));
            leftArr.push(array[left+i]);
            array[left+i].colour = "orange";
            setParameters({paramArr: array});
        }
    
        for(let i = 0; i < rightLength; ++i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));
            rightArr.push(array[middle+1+i]);
            array[middle+1+i].colour = "blue";
            setParameters({paramArr: array});
        }
    
        while(leftIndex < leftLength && rightIndex < rightLength){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));

            array[mergedIndex].colour = "grey"

            if(leftArr[leftIndex].value <= rightArr[rightIndex].value){
                
                array[mergedIndex] = leftArr[leftIndex];
                leftIndex++;
            }else{
                array[mergedIndex] = rightArr[rightIndex];                
                rightIndex++;
            }
            setParameters({paramArr: array});
            mergedIndex++;
        }

        while(leftIndex < leftLength){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));

            array[mergedIndex].colour = "grey"

            array[mergedIndex] = leftArr[leftIndex];  

            leftIndex++;
            mergedIndex++;
            setParameters({paramArr: array});
        }

        while(rightIndex < rightLength){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));

            array[mergedIndex].colour = "grey"

            array[mergedIndex] = rightArr[rightIndex];  

            rightIndex++;
            mergedIndex++;
            setParameters({paramArr: array});
        }

        if (right - left === array.length - 1) {
            for (let i = 0; i < array.length; i++) {
                await new Promise(resolve => setTimeout(resolve, speed));
                array[i].colour = "green"
                setParameters({paramArr: array});
            }
        }
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
        } else {
            await new Promise(resolve => setTimeout(resolve, speed));

            if (first > 0 && first < array.length - 1) {
                array[first].colour = "grey";
            }
            if (last != first && last > 0 && last < array.length - 1) {
                array[last].colour = "grey";
            }
            setParameters({paramArr: array});
        }
        if(first === 0 && last === array.length-1){
            array[last].colour = "grey";
            setParameters({paramArr: array});

            for (let i = 0; i < array.length; i++) {
                if (stop.current) return;
                await new Promise(resolve => setTimeout(resolve, speed));
                array[i].colour = "green";
                setParameters({paramArr: array});

            }
        }
    }

    const partition = async (array, first, last) => {
        if (stop.current) return;
        const pivot = array[last].value;

        array[last].colour = 'pink';
        let index = first - 1;

        for(let i = first; i <= last-1; ++i){
            if (stop.current) return;
            await new Promise(resolve => setTimeout(resolve, speed));
            if(array[i].value < pivot){
                index++;
                const temp = array[index];
                array[index] = array[i];
                array[i] = temp;
                array[index].colour = "orange";
                setParameters({paramArr: array});
            }
        }
        await new Promise(resolve => setTimeout(resolve, speed));
        const temp = array[index + 1];
        array[index + 1] = array[last];
        array[index + 1].colour = "grey";
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
            await new Promise(resolve => setTimeout(resolve, speed));
            await swap(array, 0, i);

            array[i].colour = "green";
            setParameters({paramArr: array});
            await heapify(array, i, 0);
        }
        array[0].colour = "green";
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
            await new Promise(resolve => setTimeout(resolve, speed));

            await swap(array, i, largest);
            array[i].colour = "orange";
            array[largest].colour = "blue";
            setParameters({paramArr: array});
            await heapify(arr, length, largest);

            await new Promise(resolve => setTimeout(resolve, speed));
            array[i].colour = "black";
            array[largest].colour = "black";
            setParameters({paramArr: array});            
        } 
    }

    return(
        <>
            <Popup parameters={{open: openPopup, setOpen: setOpenPopup, titleText: 'Hint', descriptionText: 'Use the slider to change the size of the dataset then pick a sorting algorithm!'}} />
            <div className='sort' >
                
                <br/>
                <Box width="300px">
                    <div className="sliderContainer">
                        <div className="slider-1">
                            <Typography className="text" variant="body" fontSize={'14px'} fontWeight={'500'}>
                                DATA SIZE
                            </Typography>
                            <Slider defaultValue={50}  aria-label="Small" valueLabelDisplay="auto" onChange={changeSize} />
                        </div>
                        <div className="slider-2">
                            <Typography className="text" variant="body" fontSize={'14px'} fontWeight={'500'}>
                                SPEED
                            </Typography>
                            <Slider defaultValue={100}  aria-label="Small" valueLabelDisplay="auto" onChange={changeSpeed} />
                        </div>
                    </div>
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
                    <Button variant="outlined" onClick={() => setOpenPopup(true)} >
                        Hint
                    </Button>
                </>)}
                
                <br/>
                <br/>
            </div>

            <animated.div id='sortBarContainer' style={visibleProps}>
                <BarContainer parameters={parameters}/>
            </animated.div>
        </>
        
    );    
}