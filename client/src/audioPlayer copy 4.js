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

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    }
  }, [audioUrl, isPlaying]);

  const generateAudio = async () => {
    try {
      const response = await fetch("http://localhost:3001/generate-audio", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "text": `ขอเชิญหมายเลข ${Queue} ${Name} ที่ช่องรับยาหมายเลข ${Point} ค่ะ`
        }),
      });

      const result = await response.json();
      console.log(result);

      // Fetch audio after generating
      fetchAudio();
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const fetchAudio = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAudio', {
        responseType: 'blob',
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const playAudio = () => {
    audioRef.current.load();
    audioRef.current.addEventListener('canplaythrough', () => {
      audioRef.current.play();
      console.log('Audio Played');
    });
  };

  const fetchDataAndGenerate = () => {
    fetchData();
    generateAudio();
  };

  const deleteAudio = async () => {
    try {
      await axios.delete('http://localhost:3001/api/deleteAudio');
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch(`${apiIp}/downdate/${queueID}`, {
        method: 'PATCH',
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:3001/readTVCall", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          setPoint(result[0].point_id);
          setName(result[0].fullname);
          setQueue(result[0].queue);
          setQueueID(result[0].qid);
          generateAudio();
        } else {
          console.log("No DATA!")
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <React.Fragment>
      <button onClick={fetchDataAndGenerate}>FetchData And Generate</button>
      <button onClick={deleteAudio}>Delete</button>
      <button onClick={updateData}>UpdateData</button>
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <QueueMonitor />
    </React.Fragment>
  );
}
