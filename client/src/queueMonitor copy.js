import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import NavBarQueue from './navBarQueue';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import './Blink.css'
import NewsTicker from './NewsTicker';
import { useState,useEffect } from 'react';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





export default function SimpleContainer() {

  const[queue,setQueue] = useState([]);

  const fetchDataTv = ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/readTV", requestOptions)
      .then(response => response.json())
      .then((result) =>{
        setQueue(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(()=>{
    fetchDataTv()

    const IntervalID = setInterval(fetchDataTv,1000)

    return()=>{
      clearInterval(IntervalID)
    }
  },[])


  return (
    <React.Fragment>
      <CssBaseline />
      <NavBarQueue />
      <Container maxWidth="l" sx={{marginTop:1,backgroundColor: '#212121',height:'94vh'}}>
      
      <Box sx={{ flexGrow: 1,marginTop:2 }}>
        
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item sx={{
            backgroundColor:"#002884",
            color:"white"

          }}><h1>คิวที่</h1></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{
            backgroundColor:"#ba000d",
            color:"white"
          }}><h1>ช่องรับยา</h1></Item>
        </Grid>
        
        <Grid 
        
        item xs={4}>
          <Item sx={{
            fontSize:"48px",
            backgroundColor:"#002884",
            color:"white"

          }}><h1 className='blink'>A4</h1></Item>
        </Grid>
        
        <Grid item xs={8}>
          <Item sx={{
             fontSize:"48px",
            backgroundColor:"#ba000d",
            color:"white"
          }}><h1 className='blink'>ช่องรับยาหมายเลข 1</h1></Item>
        </Grid>
        
        <Grid item xs={4}>
          <Item sx={{
            fontSize:"36px",
            backgroundColor:"#3f50b5",
            color:"white"

          }}><h1>A3</h1></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{
            fontSize:"36px",
            backgroundColor:"#f44336",
            color:"white"
          }}><h1>ช่องรับยาหมายเลข 1</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{
            backgroundColor:"#757ce8",
            color:"white"

          }}><h1>A2</h1></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{
            backgroundColor:"#ff7961",
            color:"white"
          }}><h1>ช่องรับยาหมายเลข 2</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{
            backgroundColor:"#757ce8",
            color:"white"

          }}><h1>A1</h1></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{
            backgroundColor:"#ff7961",
            color:"white"
          }}><h1>ช่องรับยาหมายเลข 2</h1></Item>
        </Grid>
      </Grid>
    </Box>
    
      <NewsTicker />
      </Container>
      
    </React.Fragment>
  );
}