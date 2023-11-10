import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'


const ErrAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'ดำเนินการไม่สำเร็จ',
    text: 'กรุณาดำเนินการอีกครั้ง',
    footer: '<a href="">ติดต่องานเทคโนโลยีสารสนเทศทางการแพทย์ ติดต่อสายใน 104</a>'
  })
};

  const showAlert = () => {
    Swal.fire({
      title: 'ดำเนินการสำเร็จ',
      text: 'ระบบได้บันทึกข้อมูลสมัครสมาชิกของท่านเรียบร้อยแล้ว',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(()=>{
      window.location.href = 'signin'
    })
  };


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  
  const [isFormComplete, setFormComplete] = React.useState('')
  const checkFormComplete = () => {
    if(fname && lname && email && password && confirmPassword && age) {
      setFormComplete(true)
    }else{
      setFormComplete(false)
    }
  }
  React.useEffect(()=>{
    checkFormComplete()
  })

  const [fname, setFname] = React.useState('')
  const [lname, setLname] = React.useState('')
  const [email, setEmail] = React.useState('')
  


  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "fname": fname,
  "lname": lname,
  "user": email,
  "password": password,
  "dep": age
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://10.0.51.72:3001/register", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result['status'] === 'ok'){
      showAlert()
    }else{
      ErrAlert()
    }
  })
  .catch(error => 
    console.log('error', error),
    ErrAlert()
    );
  };
  
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [passwordsMatch, setPasswordsMatch] = React.useState(true)
  

  React.useEffect(()=>{
    setPasswordsMatch(password === confirmPassword)
  },[password,confirmPassword])

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
         
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passwordsMatch && <p style={{color: 'red'}}>Passwords do not match</p>}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">งาน / กลุ่มงาน</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                name='dep'
                id="dep"
                value={age}
                label="งาน / กลุ่มงาน"
                onChange={handleChange}
                >
                <MenuItem value={'001'}>เภสัชกรรม</MenuItem>
                <MenuItem value={'002'}>ER</MenuItem>
                <MenuItem value={'003'}>OPD</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!passwordsMatch || !isFormComplete}
            >
              Sign Up
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
