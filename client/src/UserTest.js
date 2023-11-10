import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const handlePrintSubmit = (even) => {    

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "vn": "66000099",
      "queueType": "2",
      "hn": "000001239",
      "fname": "API CHAT",
      "dep": "OPD"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/insert", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}

  return (
    <div>
      <h1>ข้อมูลผู้ป่วย</h1>
      <form onSubmit={handlePrintSubmit}>
        <button type="submit">OK</button>

      </form>
    </div>
  );
}

export default App;
