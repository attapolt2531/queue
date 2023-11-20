import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Navbar from './Navbar';
import { apiIp, apiHisIp } from './config';










export default function UserCreate() {

  
  

  const [queueType, setQueueType] = React.useState(2);


  const handleChange = (event) => {
    setQueueType(event.target.value);
  };
  const [hn, setHn] = useState('');
  const [items, setItems] = useState([]);

 
  
  const fetchData = () => {
    fetch(`http://10.0.51.70/API/queueApi.php?hn=${hn}`)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };



  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setHn('')
  };

  

  

  const handlePrintSubmit = (e) => {
        e.preventDefault();   
        const currentItem = items[0];
      
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "vn": currentItem.vn,
  "queueType": queueType,
  "hn": currentItem.hn,
  "fname": currentItem.fname,
  "dep": currentItem.main_department
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(apiIp+"/insert", requestOptions)
    .then((result) => {
	console.log(result)
	window.location.href = 'print/' + currentItem.vn;
    })
    .catch(error => {
	console.log(error)
        window.location.href = 'print/' + currentItem.vn;    
	});

    window.location.href = 'print/' + currentItem.vn;
}


useEffect(()=>{
  const token = localStorage.getItem('token')
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+token);

var requestOptions = {
method: 'POST',
headers: myHeaders,
redirect: 'follow'
};

fetch(`${apiIp}/authen`, requestOptions)
.then(response => response.json())
.then(result => {
  if(result.status === 'ok'){
    // showAlert()
  }else{
    window.location = '/signin'
  }
})
.catch(error => console.log('error', error));

})

  

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: 2 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            สร้างบัตรคิวใหม่
          </Typography>
          <form onSubmit={handleSearchSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="hn">
                      กรอกหมายเลข Hospital Number
                    </InputLabel>
                    <Input
                      autoFocus
                      autoComplete='off'
                      id="hn"
                      value={hn}
                      onChange={(event) => setHn(event.target.value)}
                      startAdornment={
                        <InputAdornment position="start">HN</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    type="submit"
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    ค้นหาข้อมูล
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Paper>


        {items.message === 'No data found' ? (
            <Paper sx={{ padding: 2, marginTop: 2 }}>
  <Typography variant="h6" gutterBottom component="div">
    ผลลัพธ์จากการค้นหาข้อมูล
  </Typography>
    <Typography>ไม่พบข้อมูล</Typography>
    </Paper>
  ) : (
    items.map((item) => (
      <Paper sx={{ padding: 2, marginTop: 2 }} key={item.vn}>
      <Typography variant="h6" gutterBottom component="div">
        ผลลัพธ์จากการค้นหาข้อมูล
      </Typography>
      <Typography >
        
      </Typography>
      <form onSubmit={handlePrintSubmit}>
      <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField fullWidth
          id="hn"
          label="Hospital Number"
          defaultValue={item.hn}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          onChange={(event) => setHn(event.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
      <TextField fullWidth
          id="fname"
          label="ชื่อ"
          defaultValue={item.fname}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          // onChange={(event) => setFname(event.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
                  <Button
                    type="submit"
                    sx={{ m: 1 }}
                    variant="contained"
                    color='success'
                    autoFocus
                  >
                  <PrintIcon /> พิมพ์บัตรคิว
                  </Button>
                  
      </Grid>
      <Grid item xs={4}>
      <TextField fullWidth
          id="vn"
          label="VN"
          defaultValue={item.vn}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          // onChange={(event) => setVn(event.target.value)}
        />
      </Grid>
      <Grid item xs={8}>
      <TextField fullWidth
          id="dep"
          label="คลินิก"
          defaultValue={item.main_department}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          // onChange={(event) => setDep(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">ประเภทคิว</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="qtype"
        value={queueType}
        label="ประเภทคิว"
        onChange={handleChange}
      >
        <MenuItem value={2}>คิวปกติ</MenuItem>
        <MenuItem value={1}>คิวด่วน</MenuItem>
      </Select>
    </FormControl>
      </Grid>

    </Grid>
    </form>
      </Paper>
    ))
  )}




      </Container>
    </React.Fragment>
  );
}

