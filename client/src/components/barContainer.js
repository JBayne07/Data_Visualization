import { Bar } from "./bar";
let currentArr = [];
const width = 5;

export const BarContainer = ({parameters}) => {
    currentArr = parameters.paramArr;
    let height = window.innerHeight - 200;
    
    return(
        <>
            {currentArr.map((element, index) => {
                return(
                    <Bar key={index} height={(element.value/750)*height} width={width} colour={element.colour}/>
                )
            })}
        </>
    )
}