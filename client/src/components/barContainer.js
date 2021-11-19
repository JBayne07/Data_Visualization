import { Bar } from "./bar";
let currentArr = [];
const width = 5;

export const BarContainer = ({paramArr}) => {
    currentArr = paramArr.paramArr;
    return(
        <>
            {currentArr.map((element) => {
                return(
                    <Bar height={element.value} width={width} colour={paramArr.colour}/>
                )
            })}
        </>
    )
}