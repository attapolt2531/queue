const cors = require('cors')
const express = require('express');
const { request } = require('http');
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021'
const axios = require('axios');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(express.json())
app.use(cors());





//mysql connection


// production
const connection = mysql.createConnection({
    host: '10.0.51.72',
    user: 'client',
    password: 'p11026',
    database: 'phr_queue',
    port: '3306'
})

//localhost
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'phr_queue',
//     port: '3306'
// })

connection.connect((err) =>{
    if (err){
        console.log('Error connecting to mysql database = ', err)
        return;
    }
    console.log('Mysql Successfully connected!')
})



//Create Routes
app.post("/create", async(req, res)=>{
    const {vn,point_id} = req.body;
    const status = 'N'

    try{
        connection.query(
            "INSERT INTO callqueue(queue_id,point_id,datetime_call,status) VALUES(?,?,CURRENT_TIMESTAMP,?)",
            [vn,point_id,status],
            (err,result,fields) => {
                if(err){
                    console.log("Error while inserting Data into data base", err)
                    return res.status(400).send();
                }
                return res.status(201).json({status: "ok",message: "New data successfully created!"})
            }
        )

    } catch(err){
        console.log(err)
        return res.status(500).send()
    }
    
})

// Create queue
app.post("/insert", async (req, res) => {
    const { vn, queueType,queue, hn, fname, dep } = req.body;
  
    try {
      connection.query(
        "INSERT INTO queue(vn, queue_type, queue, hn, fullname, dep, vstdate, calling, print, status) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'Y', 'N', '02')",
        [vn, queueType, queue, hn, fname, dep],
        (err, result, fields) => {
          if (err) {
            console.error("Error while inserting data into the database", err);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
          }
  
          return res.status(201).json({
            id: result.insertId,
            status: "ok",
            message: "New data successfully created!",
          });
        }
      );
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  



//READ

app.get("/read", async(req,res)=>{

    

    try{

        connection.query("SELECT queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type,IFNULL(COUNT(callqueue.queue_id), 0) AS cc_call FROM queue INNER JOIN type ON type.id = queue.queue_type LEFT JOIN callqueue ON callqueue.queue_id = queue.id WHERE queue.vstdate = CURDATE() GROUP BY queue.id, queue.vn, queue.queue_type, queue.queue, queue.hn, queue.fullname, queue.dep, queue.vstdate, queue.calling, type.type ORDER BY queue.queue_type DESC;", (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})



//READ MONITOR TV

app.get("/readTV", async(req,res)=>{

    

    try{

        connection.query("SELECT point_id,queue,qid,hn,fullname,vstdate,id,queue_id,calling,queue_type FROM (SELECT callqueue.point_id,queue.queue,queue.id AS qid,queue.hn,queue.fullname,queue.vstdate,callqueue.id,callqueue.queue_id,queue.calling,queue.queue_type,ROW_NUMBER() OVER (PARTITION BY callqueue.queue_id ORDER BY callqueue.id DESC) AS row_num FROM callqueue INNER JOIN queue ON callqueue.queue_id = queue.vn WHERE queue.vstdate = CURDATE()  ORDER BY callqueue.id DESC) AS ranked WHERE row_num = 1 LIMIT 4", (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})

//READ MONITOR TV For Call

app.get("/readTvCall", async(req,res)=>{

    

    try{

        connection.query("SELECT callqueue.point_id,queue.queue,queue.id AS qid,queue.hn,queue.fullname,queue.vstdate,callqueue.id,callqueue.queue_id,queue.calling,type.type FROM queue INNER JOIN callqueue ON callqueue.queue_id = queue.vn INNER JOIN type ON type.id = queue.queue_type WHERE queue.vstdate = CURDATE() AND queue.calling='Y' ORDER BY callqueue.id ASC Limit 1", (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})


//READ new

app.get("/read/multi/:status", async(req,res)=>{

    const status = req.params.status

    try{
        if(status == 'true'){
            connection.query("SELECT queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type,IFNULL(COUNT(callqueue.queue_id),0) AS cc_call,qstatus.`name` AS qst FROM queue INNER JOIN type ON type.id = queue.queue_type LEFT JOIN callqueue ON callqueue.queue_id = queue.id INNER JOIN qstatus ON qstatus.`status` = queue.`status` WHERE queue.vstdate = CURDATE() GROUP BY queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type,qstatus.`name` ORDER BY type.type,queue.queue ASC;", (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })
        }else{
            connection.query("SELECT queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type,IFNULL(COUNT(callqueue.queue_id),0) AS cc_call,qstatus.`name` AS qst FROM queue INNER JOIN type ON type.id = queue.queue_type LEFT JOIN callqueue ON callqueue.queue_id = queue.id INNER JOIN qstatus ON qstatus.`status` = queue.`status` WHERE queue.vstdate = CURDATE() AND queue.`status` = 02 GROUP BY queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type,qstatus.`name` ORDER BY type.type,queue.queue ASC;", (err,result,fields)=>{
                if(err){
                    console.log("error")
                    return res.status(400).send();
                }
                res.status(200).json(result)
            })
        }

        

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})



//READ single

app.get("/read/single/:id", async(req,res)=>{

    const id = req.params.id

    try{

        connection.query("SELECT queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type FROM queue INNER JOIN type ON type.id = queue.queue_type WHERE queue.id = ?",[id], (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})

//READ single SAVE&PRINT

app.get("/read/singleVN/:vn", async(req,res)=>{

    const vn = req.params.vn

    try{

        connection.query("SELECT queue.id,queue.vn,queue.queue_type,queue.queue,queue.hn,queue.fullname,queue.dep,queue.vstdate,queue.calling,type.type FROM queue INNER JOIN type ON type.id = queue.queue_type WHERE queue.vn = ? ORDER BY queue.id DESC LIMIT 1",[vn], (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
})

//UPDATE data

app.patch("/update/:vn",async(req,res)=>{

    const vn = req.params.vn
    const call = 'Y'

    try{
        connection.query("UPDATE queue SET calling = ? WHERE id = ?",[call,vn],(err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json({message:"Update Success",status:"ok"})
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()

    }
})

//UPDATE data affer callq
app.patch("/downdate/:id", async (req, res) => {
    const id = req.params.id;
    const call = 'N';
    const status = 'Y';
  
    try {
      // อัพเดทตาราง "queue"
      await new Promise((resolve, reject) => {
        connection.query(
          "UPDATE queue SET calling = ? WHERE id = ?",
          [call, id],
          (err, result) => {
            if (err) {
              console.error("Error updating queue:", err);
              reject(err);
            } else {
              console.log("Queue updated successfully");
              resolve();
            }
          }
        );
      });
  
      // อัพเดทตาราง "callqueue"
      await new Promise((resolve, reject) => {
        connection.query(
          "UPDATE callqueue SET status = ? WHERE queue_id = ?",
          [status, id],
          (err, result) => {
            if (err) {
              console.error("Error updating callqueue:", err);
              reject(err);
            } else {
              console.log("Callqueue updated successfully");
              resolve();
            }
          }
        );
      });
  
      // ส่ง response กลับหลังจากที่ทั้งสองตารางถูกอัพเดท
      res.status(200).json({ message: "Update Success", status: "ok" });
    } catch (err) {
      console.error("Internal Server Error:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

// app.patch("/downdate/:id",async(req,res)=>{

//     const id = req.params.id
//     const call = 'N'
//     const status = 'Y'

//     try{
//         connection.query("UPDATE queue SET calling = ? WHERE id = ?",[call,id,status],(err,result,fields)=>{
//             if(err){
//                 console.log("error")
//                 return res.status(400).send();
//             }
//             res.status(200).json({message:"Update Call Success",status:"ok"})
//         })

//     }catch(err){
//         console.log(err)
//         return res.status(500).send()

//     }
// })




//UPDATE Status

app.patch("/update/status/:vn",async(req,res)=>{

    const vn = req.params.vn
    const status = 'Y'

    try{
        connection.query("UPDATE callqueue SET status = ? WHERE queue_id = ?",[status,vn],(err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json({message:"Update Success",status:"ok"})
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()

    }
})

//DELETE

app.delete("/delete/:id",async(req,res)=>{

    const id = req.params.id

    try{
        connection.query("DELETE FROM queue WHERE id = ?",[id],(err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            if(result.affectedRows == 0){
                return res.status(404).json({message:"no user by your id"})
            }
            return res.status(200).json({message:"delete"})
        })

    }catch(err){
        console.log(err)
        return res.status(500).send()

    }
})

//login

app.post("/login", async (req, res) => {
    const {user} = req.body

    try{

        connection.query(
            "SELECT * FROM users WHERE user = ?",
            [user],
            (err, result, fields) => {
                if (err) {
                    res.json({status: 'error',message: err})
                    return
                }
                if(result == 0){
                return res.json({
                    status: 'error',
                    message: 'no user found'                    
                 });
                }
                bcrypt.compare(req.body.password, result[0].pass, function(err, isLogin) {
                    // result == true
                    if(isLogin){
                        var token = jwt.sign({ user: result[0].user }, secret,{ expiresIn: '8h'});
                        res.json({status:'ok',message:'login success',token})
                    }else{
                        res.json({status:'error',message:'login failed'})
                    }
                });
            }
        );
        
    } catch(error){
        console.log("Error", error);
        return res.status(500).send();
    }
})

//Authen
app.post('/authen', async(req,res) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status:'ok', decoded})
    }catch(err){
        res.json({status:'eror',message: err.message})
    }
    
})

//register

app.post("/register", async (req, res) => {
    const { fname, lname, user, password, dep } = req.body;

    try {

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            connection.query(
                "INSERT INTO users(fname,lname,user,pass,dep,point,vstdate) VALUES (?, ?, ?, ?, ?,'',CURRENT_TIMESTAMP)",
                [fname, lname, user, hash, dep],
                (err, result, fields) => {
                    if (err) {
                        console.log("Error while inserting data into database", err);
                        return res.status(400).send();
                    }
                    return res.status(201).json({ 
                        id:result.insertId,
                        status:"ok",
                        message: "New data successfully created!"
                     });
                }
            );
        });
                

    } catch (error) {
        console.log("Error", error);
        return res.status(500).send();
    }
});

app.patch('/generate-audio', async (req, res) => {
    try {
      const { text } = req.body;
      const fileName = 'output.mp3'; // ใช้ชื่อไฟล์และนามสกุลตามที่คุณต้องการ
      const outputPath = path.join(__dirname, 'audio', fileName);
      const apiUrl = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=th&client=tw-ob`;
  
      // ทำ HTTP request เพื่อดึงข้อมูล mp3
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
  
      // ตรวจสอบและสร้างโฟลเดอร์ audio หากไม่มี
      const audioFolder = path.join(__dirname, 'audio');
      if (!fs.existsSync(audioFolder)) {
        fs.mkdirSync(audioFolder);
      }
  
      // เขียนข้อมูลลงในไฟล์
      fs.writeFileSync(outputPath, Buffer.from(response.data));
  
      console.log('ดาวน์โหลดและบันทึกไฟล์เสียงเรียบร้อย');
  
      // เช็คว่าไฟล์ถูกเขียนเรียบร้อยหรือไม่
      fs.access(outputPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error('มีปัญหาในการเข้าถึงไฟล์:', err);
          return res.status(500).json({ error: 'มีปัญหาในการเข้าถึงไฟล์' });
        }
  
        console.log('ไฟล์ถูกเขียนเรียบร้อย');
        res.json({ success: true, message: 'ไฟล์ถูกเขียนเรียบร้อย' });
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดาวน์โหลดข้อมูล:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดาวน์โหลดข้อมูล', detailedError: error.message });
    }
  });

// Serve static files (including MP3 files)
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// API endpoint to get MP3 file
app.get('/api/getAudio', (req, res) => {
    const filePath = path.join(__dirname, 'audio', 'output.mp3');
    res.status(200).sendFile(filePath);
    
    
  });
  
app.delete('/api/deleteAudio', (req, res) => {
    const filePath = path.join(__dirname, 'audio', 'output.mp3');
    // ลบไฟล์
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ error: 'Error deleting file' });
    }

    console.log('File deleted successfully');
    res.json({ success: true, message: 'File deleted successfully' });
  });
});


app.listen(3001,()=>console.log('Server Is running on port 3001'));