import '../components/bar.css'

export const Bar = ({height, width, colour}) => {
    
    return(
        <>
            <svg width={width} height={height} className={`sortBars ${colour}`}>
                {/* <rect className={colour} width={width} height={height} /> */}
            </svg>
        </> 
    )      
}