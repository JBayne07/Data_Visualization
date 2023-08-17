import { Typography, Button, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useHistory } from "react-router-dom";
import './home.css';
import SortingImage from '../assets/sorting_image.png';
import GraphImage from '../assets/graph_image.png';

export const Home = () => {
    const history = useHistory();

    return(
        <div className="homeContainer">
            <div className="textContainer">
                <Typography className="text" variant="h2" component="div" pt={'8rem'}>
                    Welcome to the Algorithm Visualizer!
                </Typography>
                <Typography className="text" mt={'2rem'}  variant="h5">
                    Step into the world of algorithms with the Algorithm Visualizer--an interactive online platform that transforms
                    code into visualizations. At the moment, we offer sorting and graph-searching algorithms, with exciting plans for upcoming additions!
                </Typography>
                <div className="contentContainer">
                    <Typography className="text" variant="h4">
                        Please select an algorithm type to begin:
                    </Typography>

                    <div className="imageContainer">
                        <ImageList gap={100} sx={{ width: 470, height: 185 }}>
                            <ImageListItem
                                className="image"
                                onClick={() => {history.push('/sort')}}
                            >
                                <img
                                    src={SortingImage}
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={'SORTING'}
                                    position="top"
                                />
                            </ImageListItem>
                            <ImageListItem
                                className="image"
                                onClick={() => {history.push('/graph')}}
                            >
                                <img
                                    src={GraphImage}
                                />
                                <ImageListItemBar
                                    sx={{
                                        textColor: '#1976d2',
                                        background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={'GRAPH'}
                                    position="top"
                                />
                            </ImageListItem>
                        </ImageList>
                    </div>
                    
                    
                    {/* <div className="buttonContainer">
                        <Button variant="outlined" sx={{ marginRight: '0.25rem' }} }>
                            SORTING
                        </Button>
                        <Button variant="outlined" sx={{ marginLeft: '0.25rem' }} onClick={() => {history.push('/graph')}}>
                            GRAPH
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    )   
}