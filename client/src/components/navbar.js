import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
// import { Link } from '@mui/material';
import { AppBar, Box, Toolbar, Typography, Button, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My App
              </Typography>
              <Button color="inherit">               
                  <Link to='/sort' className='SortPage' color="inherit">
                    Sorting
                  </Link>
              </Button>
              <Button color="inherit">Graph</Button>
            </Toolbar>
          </AppBar>
        </Box>
    );
}

export default Navbar;