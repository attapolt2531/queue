import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';



export default function ButtonAppBar() {

  const handleLogout = (event)=>{
    event.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('selectIndex')
    window.location = '/signin'
  }
 
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
            component="a"
            href="/"
            sx={{ mr: 2 }}>
            <MenuIcon />
            
          </IconButton>
          <Typography            
            
            component="a"
            href="/" sx={{ 
              flexGrow: 1 ,
              color: 'inherit',
              textDecoration: 'none'
              }}>
            ระบบเรียกคิวโรงพยาบาลสร้างคอม : ห้องจ่ายยา
          </Typography>
          
                <Button variant="contained" color='secondary' startIcon={<LoginIcon />} onClick={handleLogout}>logout</Button>
              
        </Toolbar>
      </AppBar>
    </Box>
  );
}