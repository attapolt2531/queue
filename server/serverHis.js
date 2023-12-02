const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021';

const app = express();
app.use(express.json());
app.use(cors());

// Mysql connection

const dbConfigHis = {
    host: '10.0.51.4',
    user: 'clientaccess',
    password: 'p11026',
    database: 'hosxp',
    port: '3306',
};

let connectionHis;

function handleDisconnectHis() {
    connectionHis = mysql.createConnection(dbConfigHis);

    connectionHis.connect((err) => {
        if (err) {
            console.log('Error when connecting to database:', err);
            setTimeout(handleDisconnectHis, 2000);
        } else {
            console.log('Connected to database His');
        }
    });

    connectionHis.on('error', (err) => {
        console.log('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnectHis();
        } else {
            throw err;
        }
    });
}

handleDisconnectHis();

const dbConfigPhr = {
    host: '10.0.51.72',
    user: 'client',
    password: 'p11026',
    database: 'phr_queue',
    port: '3306',
};

let connectionPhr;

function handleDisconnectPhr() {
    connectionPhr = mysql.createConnection(dbConfigPhr);

    connectionPhr.connect((err) => {
        if (err) {
            console.log('Error when connecting to database:', err);
            setTimeout(handleDisconnectPhr, 2000);
        } else {
            console.log('Connected to database Phr');
        }
    });

    connectionPhr.on('error', (err) => {
        console.log('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnectPhr();
        } else {
            throw err;
        }
    });
}

handleDisconnectPhr();

// READ new

app.get("/read/multi/:status", async (req, res) => {
  const status = req.params.status;

  try {
      if (status == 'true') {
          connectionHis.query("SET NAMES utf8mb4");
          connectionHis.query("SELECT ovst.hn, ovst.vn, CONCAT(patient.pname,patient.fname,' ',patient.lname) AS fullname, ovst.rx_queue, rx_operator.rx_time,kskdepartment.department FROM rx_operator INNER JOIN ovst ON rx_operator.vn = ovst.vn INNER JOIN patient ON patient.hn = ovst.hn INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode WHERE vstdate = CURDATE() AND rx_operator.rx_depcode IN ('020') ORDER BY ovst.rx_queue ASC", (err, result, fields) => {
              if (err) {
                  console.log("error");
                  return res.status(400).send();
              }
              res.status(200).json(result);
          });
      } else {
        connectionPhr.query("SELECT queue_id FROM callqueue WHERE status = 'Y'", (errPhr, resultPhr, fieldsPhr) => {
          if (errPhr) {
            console.log("error fetching queue_id from phr_queue.call_queue");
            return res.status(400).send();
          }


        
          // Extract vn values from the resultPhr
          const vnList = resultPhr.map((item) => item.queue_id);
        
          connectionHis.query("SET NAMES utf8mb4");
          const queryString = `
            SELECT
              ovst.hn,
              ovst.vn,
              CONCAT(patient.pname, patient.fname, ' ', patient.lname) AS fullname,
              ovst.rx_queue,
              rx_operator.rx_time,
              kskdepartment.department
            FROM
              rx_operator
            INNER JOIN ovst ON rx_operator.vn = ovst.vn
            INNER JOIN patient ON patient.hn = ovst.hn
            INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode
            WHERE
              vstdate = CURDATE()
              AND rx_operator.rx_depcode IN ('020')
              AND ovst.vn NOT IN (?)
            ORDER BY
              ovst.rx_queue ASC
          `;
        
          connectionHis.query(queryString, [vnList], (errHis, resultHis, fieldsHis) => {
            if (errHis) {
              console.log("error fetching data from hosxp.ovst");
              return res.status(400).send();
            }
            res.status(200).json(resultHis);
          });
        });
      }
  } catch (err) {
      console.log(err);
      return res.status(500).send();
  }
});


// User Print

app.get("/read/single/:vn", async (req, res) => {

    const vn = req.params.vn

    try {
        connectionHis.query("SET NAMES utf8mb4");
        connectionHis.query("SELECT ovst.hn, ovst.vn, CONCAT(patient.pname,patient.fname,' ',patient.lname) AS fullname, ovst.rx_queue, rx_operator.rx_time,kskdepartment.department FROM rx_operator INNER JOIN ovst ON rx_operator.vn = ovst.vn INNER JOIN patient ON patient.hn = ovst.hn INNER JOIN kskdepartment ON ovst.main_dep = kskdepartment.depcode WHERE vstdate = CURDATE() AND rx_operator.rx_depcode IN ('020') AND ovst.vn = ? ORDER BY ovst.rx_queue ASC", [vn], (err, result, fields) => {
            if (err) {
                console.log("error")
                return res.status(400).send();
            }
            res.status(200).json(result)
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
});

app.listen(3002, () => console.log('Server Is running on port 3002'));
