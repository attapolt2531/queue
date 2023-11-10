import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'


const ErrAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'เกิดข้อผิดพลาด',
    text: 'กรุณาตรวจสอบชื่อผู้ใช้ หรือ รหัสผ่าน และเข้าใช้งานอีกครั้ง',
    footer: '<a href="">งานเทคโนโลยีสารสนเทศทางการแพทย์ โทร.104</a>'
  })
};

  // const showAlert = () => {
  //   Swal.fire({
  //     title: 'Hello',
  //     text: 'This is a SweetAlert in React!',
  //     icon: 'success',
  //     confirmButtonText: 'OK'
  //   }).then(()=>{
  //     window.location.href = 'signin'
  //   })
  // };

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

export default function SignIn() {
  const [username,setUsername] = React.useState('')
  const [password,setPassword] = React.useState('')
  const handleSubmit = (event) => {
            event.preventDefault();
            // const data = new FormData(event.currentTarget);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "user": username,
              "password": password
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("http://10.0.51.72:3001/login", requestOptions)
              .then(response => response.json())
              .then(result => {
                if(result['status'] === 'ok'){
                  localStorage.setItem('token', result.token);
                  // showAlert()
                  window.location = '/'
                  // console.log(result)
                }else{
                 ErrAlert()
                  console.log(result)
                }
              })
              .catch((error) =>
                 console.log('error', error),
                 
                 );                   
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
          
          <Typography component="h1" variant="h6">ระบบเรียกคิวโรงพยาบาลสร้างคอม</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}