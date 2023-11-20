import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { apiIp, apiHisIp } from './config';




// Production
  // const apiIp = "http://10.0.51.72:3001";

  // Localhost
  // const apiIp = "http://localhost:3001";

export default function Print() {

  const formatQueueNumber = (number) =>{
    return number.toString().padStart(3,'0')
  }

    
    const { vn } = useParams();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        window.location.href='/'
    };

    

    useEffect(()=>{
        handleClickOpen();
    },[]);

    const printAndCloseTab = () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${apiIp}/read/singleVN/${vn}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result && result.length > 0) {
            const currentItem = result[0];
            const newTab = window.open('', '_blank');
            newTab.document.write('<html><body><center>บัตรคิวห้องจ่ายยา<br><h3>คิวที่</h3><h1>' + currentItem.type + formatQueueNumber(currentItem.queue) +'</h1><p>'+ currentItem.fullname +'</p><p>' + currentItem.hn + '</p></center></body></html>');
            newTab.window.print();
            newTab.window.close();
            window.location.href = '/';
          } else {
            console.error('No data found');
          }
        })
        .catch(error => console.log('error', error));
      
    
    
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
    <div>
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"บันทึกข้อมูลสำเร็จ"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ต้องการพิมพ์บัตรคิวหรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={printAndCloseTab} autoFocus>
            พิมพ์บัตรคิว
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  )
}
