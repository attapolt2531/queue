import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import LogoSk from './logosk.png'


function NavBarQueue() {
  const [thaiDateTime, setThaiDateTime] = React.useState('');

  React.useEffect(() => {
    function displayTime() {
      const now = new Date();
      const formattedDateTime = now.toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });

      setThaiDateTime(formattedDateTime);
    }

    const intervalId = setInterval(displayTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#590995"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "center"}}>
        {/* <img src={LogoSk} alt='logo'></img> */}
      
        
        <Typography variant='h5' sx={{color:"#FFFF",padding:1,marginTop:2}}>
          {thaiDateTime} น.
        </Typography>
      </Toolbar>

    </AppBar>
  );
}

export default NavBarQueue;
