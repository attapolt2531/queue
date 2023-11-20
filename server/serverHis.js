const cors = require('cors')
const express = require('express');
const { request } = require('http');
const mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021'


const app = express();
app.use(express.json())
app.use(cors());





//mysql connection


// production
// const connection = mysql.createConnection({
//     host: '10.0.51.72',
//     user: 'client',
//     password: 'p11026',
//     database: 'phr_queue',
//     port: '3306'
// })

//localhost
const connection = mysql.createConnection({
    host: '10.0.51.4',
    user: 'clientaccess',
    password: 'p11026',
    database: 'hosxp',
    port: '3306',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
})

connection.connect((err) =>{
    if (err){
        console.log('Error connecting to mysql database = ', err)
        return;
    }
    console.log('Mysql Successfully connected!')
})


//READ new

app.get("/read/multi/:status", async(req,res)=>{

    const status = req.params.status

    try{
        if(status == 'true'){
            connection.query("SET NAMES utf8mb4");
            connection.query("SELECT ovst.hn, ovst.vn, CONCAT(patient.pname,patient.fname,' ',patient.lname) AS fullname, ovst.rx_queue, rx_operator.rx_time,kskdepartment.department FROM rx_operator INNER JOIN ovst ON rx_operator.vn = ovst.vn INNER JOIN patient ON patient.hn = ovst.hn INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode WHERE vstdate = CURDATE() AND rx_operator.rx_depcode IN ('020') ORDER BY ovst.rx_queue ASC", (err,result,fields)=>{
            if(err){
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })
        }else{
            connection.query("SET NAMES utf8mb4");
            connection.query("SELECT ovst.hn, ovst.vn, CONCAT(patient.pname,patient.fname,' ',patient.lname) AS fullname, ovst.rx_queue, rx_operator.rx_time,kskdepartment.department FROM rx_operator INNER JOIN ovst ON rx_operator.vn = ovst.vn INNER JOIN patient ON patient.hn = ovst.hn INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode WHERE vstdate = CURDATE() AND rx_operator.rx_depcode IN ('020') ORDER BY ovst.rx_queue ASC", (err,result,fields)=>{
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

//User Print

app.get("/read/single/:vn", async(req,res)=>{

    const vn = req.params.vn

    try{
        connection.query("SET NAMES utf8mb4");
        connection.query("SELECT ovst.hn, ovst.vn, CONCAT(patient.pname,patient.fname,' ',patient.lname) AS fullname, ovst.rx_queue, rx_operator.rx_time,kskdepartment.department FROM rx_operator INNER JOIN ovst ON rx_operator.vn = ovst.vn INNER JOIN patient ON patient.hn = ovst.hn INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode WHERE vstdate = CURDATE() AND rx_operator.rx_depcode IN ('020') AND ovst.vn = ? ORDER BY ovst.rx_queue ASC",[vn], (err,result,fields)=>{
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








app.listen(3002,()=>console.log('Server Is running on port 3002'));