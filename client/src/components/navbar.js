import React from 'react';
import { Link} from 'react-router-dom';
// import { Link } from '@mui/material';
import { AppBar, Box, Toolbar, Typography, Button, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 2 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
                <Link to='/' className='HomePage' color="inherit" style={{"textDecoration":"none", "color":"white"}}>
                  Algorithm Visualizer
                </Link>
              </Typography>
              <MenuItem>
                <Link to='/' className='HomePage' color="inherit" style={{"textDecoration":"none", "color":"white"}}>
                  HOME
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to='/sort' className='HomePage' color="inherit" style={{"textDecoration":"none", "color":"white"}}>
                  SORTING
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to='/graph' className='HomePage' color="inherit" style={{"textDecoration":"none", "color":"white"}}>
                  GRAPH
                </Link>
              </MenuItem>
            </Toolbar>
          </AppBar>
        </Box>
    );
}