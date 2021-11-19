import '../components/bar.css'

export const Bar = ({height, width, colour}) => {
    
    return(
        <>
            <svg width={width} height={height} className='sortBars'>
                <rect width={width} height={height} fill={colour}/>
            </svg>
        </> 
    )      
}