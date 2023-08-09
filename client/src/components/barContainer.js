import { Bar } from "./bar";
let currentArr = [];
const width = 5;

export const BarContainer = ({parameters}) => {
    currentArr = parameters.paramArr;

    
    return(
        <>
            {currentArr.map((element, index) => {
                return(
                    <Bar key={index} height={element.value} width={width} colour={element.colour}/>
                )
            })}
        </>
    )
}