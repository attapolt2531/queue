import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QueueMonitor from './queueMonitor';
import { apiIp } from './config';

export default function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueID, setQueueID] = useState('');
  const [Queue, setQueue] = useState('');
  const [Name, setName] = useState('');
  const [Point, setPoint] = useState('');

  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying.toString());
  }, [isPlaying]);

  const generateAudio = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "text": `ขอเชิญหมายเลข ${Queue} ${Name} ที่ช่องรับยาหมายเลข ${Point} ค่ะ`
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/generate-audio", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      } 

  const fetchAudio = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAudio', {
        responseType: 'blob',
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const play = () => {
    audioRef.current.load();
    audioRef.current.addEventListener('canplaythrough', () => {
      audioRef.current.play();
      setIsPlaying(true);
      console.log(isPlaying);
    });
  };


  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/readTVCall", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.length > 0){
        setPoint(result[0].point_id);
        setName(result[0].fullname);
        setQueue(result[0].queue);
        setQueueID(result[0].qid);
        }else{
          console.log("No DATA!")
        }
       
      })
      .catch(error => console.log('error', error));
  }

  const deleteAudio = async () => {
    try {
      await axios.delete('http://localhost:3001/api/deleteAudio');
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };

  const updateData = () => {
    var requestOptions = {
      method: 'PATCH',
      redirect: 'follow',
    };
  
    fetch(`${apiIp}/downdate/${queueID}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result)) // ใส่ log ที่นี่
      .catch(error => console.log('error', error));
  };

  return (
    <React.Fragment>
      <button onClick={fetchData}>fetchData</button>
      <button onClick={generateAudio}>generate</button>
      <button onClick={fetchAudio}>FetchAudio</button>
      <button onClick={play}>Play</button> {/* เล่นไฟล์จบแล้วถึงทำขั้นตอนต่อไป  */}
      <button onClick={deleteAudio}>Delete</button>
      <button onClick={updateData}>Updatedata</button>
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <QueueMonitor />
    </React.Fragment>
  );
}
