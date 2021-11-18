import { Bar } from "./bar";

const width = 5;

export const BarContainer = ({paramArr}) => {
    console.log('bar container: ', paramArr.paramArr[0].value);

    return(
        <>
        {/* paramArr.map(element => {
             <Bar height={element.value} width={width}/>
        }) */}
            <Bar height={paramArr.paramArr[0].value} width={width}/>
        </>
    )
}