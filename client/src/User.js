import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
import ButtonGroupChanel from './buttonGroupChanel';
// import ButtonGroupPatient from './buttonGroupPatient';
import { Badge, Container } from '@mui/material';
// import Link from '@mui/material/Link';
import Navbar from './Navbar';
// import { Link } from 'react-router-dom';
import { apiIp, apiHisIp } from './config';
import Swal from 'sweetalert2';
import MaterialUISwitch from './switch';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';


const ErrAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'คุณไม่ได้ระบุช่องบริการ',
    text: 'กรุณาระบุช่องบริการที่คุณต้องการเรียก!',
    footer: '<a href="">Why do I have this issue?</a>'
  })
};



export default function Users() {

  // const formatQueueNumber = (number) =>{
  //   return number.toString().padStart(3,'0')
  // }

  const showAlert = (row) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${apiIp}/read/single/${row.vn}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        Swal.fire({
          title: 'ระบบกำลังเรียกคิวผู้ป่วย',
          text: `คิวที่ ${row.oqueue} HN ${row.hn} ${row.fullname}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่, ผู้ป่วยมารับบริการแล้ว!',
          cancelButtonText: 'ผู้ป่วยยังไม่มา'
        }).then((result) => {
          if (result.isConfirmed) {
            var requestOptions = {
              method: 'PATCH',
              redirect: 'follow'
            };
            
            fetch(`${apiIp}/update/status/${row.vn}`, requestOptions)
              .then(response => response.json())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
            Swal.fire(
              'บันทึกข้อมูลสำเร็จ!',
              'ปรับปรุงสถานะของผู้ป่วยเรียบร้อยแล้ว',
              'success'
            );
          }
        });
      })
      .catch(error => console.log('error', error));
  };

  
  

  const [items, setItems] = useState([]);


  // const { index } = useParams();
  //Chanel
  const storedIndex = localStorage.getItem('selectIndex');
  const [selectedIndex, setSelectedIndex] = React.useState(
    storedIndex !== null ? parseInt(storedIndex, 10) : 0
  );
  
  useEffect(() => {
    localStorage.setItem('selectIndex', selectedIndex.toString());
  }, [selectedIndex]);
  
  useEffect(() => {
    const storedIndex = localStorage.getItem('selectIndex');
    if (storedIndex !== null) {
      setSelectedIndex(parseInt(storedIndex, 10));
    }
  }, []);
  
  

  // const [selectedIndex, setSelectedIndex] = React.useState(parseInt(index) || 0); // เพิ่มตัวแปร selectedIndex


  // const [storeSwitch, setStoreSwitch] = useState(false);


  




  // const apiValue = getApiIp();

  

const fetchData = () => {
  const storeSwitch = localStorage.getItem('switch');

  fetch(apiHisIp +"/read/multi/"+storeSwitch)
    .then(res => res.json())
    .then((result) =>{
      setItems(result)
    })
    .catch(error =>{
      console.error("Error fetching data :",error)
    })
}

useEffect(()=>{
  fetchData();
  const intervalID = setInterval(fetchData,3000)
  return()=>{
    clearInterval(intervalID)
  }
})


const generateAudio = async (row, selectedIndex) => {
  try {
    // 1. สร้างข้อความสำหรับ TTS
    const payload = {
      name: `${row.vn}${selectedIndex}`,
      text: `ขอเชิญ ${row.fullname} ที่ช่องรับยาหมายเลข ${selectedIndex} ค่ะ`,
    };

    // 2. เรียก API สร้างไฟล์เสียง
    const res = await fetch(`${apiIp}/generate-audio`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (!result.success) {
      console.error('สร้างไฟล์ mp3 ไม่สำเร็จ:', result.error);
      return;
    }

    // 3. backend ส่งกลับ URL สำหรับเล่นเสียง เช่น "/audio/output.mp3"
    const audioUrl = result.url;

    // 4. เล่นไฟล์เสียงทันที ด้วยระดับเสียงสูงสุด
    const audio = new Audio(audioUrl);
    audio.volume = 1.0;         // เต็มเสียง
    audio.play().catch(console.error);

    // 5. ทำงานอื่น ๆ ต่อ เช่น บันทึกคิว ฯลฯ
    create(row, selectedIndex);
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการเรียก API:', err);
  }
};


const create = (row, selectedIndex) => {
  var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            vn: row.vn,
            point_id: selectedIndex,
          });

          var postRequestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(apiIp + '/create', postRequestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)
              insert(row);
            })
            .catch(error => console.error('Error in second fetch:', error));
}

const createDel = (row, selectedIndex) => {
  var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            vn: row.vn,
            point_id: selectedIndex,
          });

          var postRequestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(apiIp + '/createDel', postRequestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)
            })
            .catch(error => console.error('Error in second fetch:', error));
}

const insert = (row) => {
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "vn": row.vn,
      "queueType": "2",
      "queue": row.oqueue,
      "hn": row.hn,
      "fname": row.fullname,
      "dep": row.department
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${apiIp}/insert`, requestOptions)
      .then(response => response.json()) // Assuming the response is in JSON format
      .then(result => {
        console.log(result);

        showAlert(row)
      })
      .catch(error => console.error('Error in first fetch:', error));
}



const call = (row, selectedIndex) => {
  if (selectedIndex === 0) {
    ErrAlert();
  } else {
    generateAudio(row, selectedIndex)    
  }
}




  const printAndCloseTab = (vn) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${apiHisIp}/read/single/${vn}`, requestOptions)
      .then(response => response.json())
      .then(result => {
            // เปิดหน้าในแท็บใหม่
            const newTab = window.open('', '_blank');
            // เขียนเนื้อหาที่ต้องการพิมพ์ในแท็บใหม่
            newTab.document.write('<html><body><center>บัตรคิวห้องจ่ายยา<br><h3>คิวที่</h3><h1>' + result[0].rx_queue +'</h1><p>'+ result[0].fullname +'</p><p>' + result[0].hn + '</p></center></body></html>');
            // เรียกใช้ window.print() เพื่อพิมพ์
            newTab.window.print();
            // ปิดแท็บหลังจากพิมพ์เสร็จ
            newTab.window.close();
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

  const [searchTerm, setSearchTerm] = React.useState('');

const filteredItems = items.filter((row) => {
  const hn = row.hn?.toLowerCase() || "";
  const name = row.fullname?.toLowerCase() || "";
  const term = searchTerm.toLowerCase();
  return hn.includes(term) || name.includes(term);
});

   

  


  return (
  <React.Fragment>
    <CssBaseline />
    <Navbar />
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Paper sx={{ padding: 2 }}>
        {/* <Control/> */}
        <Box display="flex" sx={{ padding: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Link href='create'>
              <Button variant="contained" color='error' startIcon={<AddCircleIcon />}>สร้างบัตรคิวใหม่</Button>
            </Link> */}
          </Box>
          <Box sx={{ padding: 1 }}>
            <MaterialUISwitch />
            {/* <ButtonGroupPatient /> */}
          </Box>
          <Box sx={{ padding: 1 }}>
            <ButtonGroupChanel selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
          </Box>
        </Box>

        {/* ช่องค้นหา */}
        <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
          <TextField
            label="ค้นหา HN หรือ ชื่อ"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* ตารางแสดงผล */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: '#1D5D9B' }}>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }}></TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>HN</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="center">vn</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="right">Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="right">Department</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="right">Queue</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="right">Status</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={row.type === 'A' ? { background: '#FF7676' } : {}}
                >
                  <TableCell component="th" scope="row">
                    <IconButton aria-label="delete" color="error">
                      <RemoveCircleIcon onClick={() => createDel(row, selectedIndex)} />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">{row.hn}</TableCell>
                  <TableCell align="center">{row.vn}</TableCell>
                  <TableCell align="right">{row.fullname}</TableCell>
                  <TableCell align="right">{row.department}</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="right">{row.oqueue}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="center">
                    <Badge badgeContent={row.cc_call} color='error'>
                      <Button
                        variant="contained"
                        color='success'
                        onClick={() => call(row, selectedIndex)}
                        endIcon={<CampaignIcon />}
                      >
                        เรียก
                      </Button>
                    </Badge>
                    <Button sx={{ marginLeft: 2 }} variant="contained" color='warning' onClick={() => printAndCloseTab(row.vn)}>
                      <LocalPrintshopIcon />Print
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  </React.Fragment>
);

}
