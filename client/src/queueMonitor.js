import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import NavBarQueue from './navBarQueue';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import './Blink.css'
// import NewsTicker from './NewsTicker';
import { useState,useEffect } from 'react';
import { apiIp, apiHisIp } from './config';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '10px'
}));





// ... (other import statements)

export default function SimpleContainer() {

  const formatQueueNumber = (number) =>{
    return number.toString().padStart(3,'0')
  }

  const [queue, setQueue] = useState([]);

  const fetchDataTv = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${apiIp}/readTV`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setQueue(result);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    fetchDataTv();

    const intervalId = setInterval(fetchDataTv, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <React.Fragment>
         <CssBaseline />
      <NavBarQueue />
      <Container maxWidth="l" sx={{marginTop:1,backgroundColor: '#590995',height:'94.8vh'}}>

      {/* ... (other components) */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item sx={{
            backgroundColor: "#03C4A1",
            color: "white"
          }}><h1>ลำดับที่</h1></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{
            backgroundColor: "#C62A88",
            color: "white"
          }}><h1>จุดบริการ</h1></Item>
        </Grid>
        {Array.isArray(queue) && queue.map((item, index) => (
  <React.Fragment key={item.id}>
    <Grid item xs={4}>
      <Item sx={{
        fontSize: index === 0 ? "48px" : (index === 1 ? "36px" : "24px"),
        backgroundColor: index === 0 ? "#00745F" : (index === 1 ? "#03C4A1" : "#BDFEF2"),
        color: "white"
      }}>
        <h1 className={index === 0 ? 'blink' : ''}>{item.type + formatQueueNumber(item.queue)}</h1>
      </Item>
    </Grid>

    <Grid item xs={8}>
      <Item sx={{
        fontSize: index === 0 ? "48px" : (index === 1 ? "36px" : "24px"),
        backgroundColor: index === 0 ? "#900057" : (index === 1 ? "#C62A88" : "#FBCAFF"),
        color: "white"
      }}>
        <h1 className={index === 0 ? 'blink' : ''}>ช่องรับยาหมายเลข {item.point_id}</h1>
      </Item>
    </Grid>
  </React.Fragment>
))}

      </Grid>
      {/* ... (other components) */}
     
      </Container>
    </React.Fragment>
  );
}
