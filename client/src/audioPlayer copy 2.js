import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QueueMonitor from './queueMonitor';
import {apiIp} from './config'

export default function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueID, setQueueID] = useState('');
  const [Point, setPoint] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Queue, setQueue] = useState('');


  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying.toString());
  }, [isPlaying]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
  
    // เพิ่ม event listener สำหรับเมื่อไฟล์ MP3 ถูกเล่นจบ
    currentAudioRef.addEventListener('ended', () => {
      setIsPlaying(false);
      deleteAudio();
      updateData();
    });
  
    // ตอนที่ component ถูก unmount, ลบ event listener
    return () => {
      currentAudioRef.removeEventListener('ended', () => {
        setIsPlaying(false);
        deleteAudio();
        updateData();
      });
    };
  }); // ใช้วิธีนี้เพื่อหลีกเลี่ยงการเรียกใช้งาน useEffect หลายครั้ง



  const fetchAudio = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAudio', {
        responseType: 'blob',
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      play()
    } catch (error) {
      console.error('Error fetching audio:', error);
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

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${apiIp}/readTVCall`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.length > 0){
          setQueueID(result[0].qid);
          setPoint(result[0].point_id);
          setFullname(result[0].fullname);
          setQueue(result[0].queue);
          
        }else{
          console.log("No DATA!")
        }
       
      })
      .catch(error => console.log('error', error));
  };

  const play = () => {
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
    console.log(isPlaying);
  };

  // const pause = () => {
  //   audioRef.current.pause();
  //   setIsPlaying(false);
  //   console.log(isPlaying);
  // };

  const getAudio = async () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "text": `ขอเชิญหมายเลข ${Queue} ${Fullname} ที่ช่องรับยาหมายเลข ${Point} ค่ะ`
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3001/generate-audio", requestOptions)
        .then(response => response.json())
        .then.then(result => {
          if(result.success === true){
            fetchAudio();
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

  useEffect(()=>{
    if(isPlaying === false){
      fetchData();
         const intervalID = setInterval(fetchData,1000)
       return()=>{
         clearInterval(intervalID)
       }
    }

  })


  return (
    <React.Fragment>
      {/* <button onClick={fetchAudio}>Fetch and Play</button> */}
      {/* <button onClick={play}>Play</button> */}
      {/* <button onClick={pause}>Pause</button> */}
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <QueueMonitor />
    </React.Fragment>
  );
}
