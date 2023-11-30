import React, { useEffect, useRef, useState } from 'react';
import { apiIp, apiHisIp } from './config';
import QueueMonitor from './queueMonitor'

export default function AudioPlayer() {



  
  
  // const generateSoundFiles = (queue) => {
  //   return Array.from({ length: 10 }, (_, index) => {
  //     const formattedQueue = formatQueueNumber(index + 1);
  //     return queue && require(`./sound/${formattedQueue}.mp3`);
  //   }).filter(Boolean);
  // }



  const [point, setPoint] = useState('');
  const [type, setType] = useState('');
  const [queue, setQueue] = useState('');
  const [queueID, setQueueID] = useState('');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);





  
  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying.toString());
  }, [isPlaying]);

  const updateData = () =>{
    var requestOptions = {
      method: 'PATCH',
      redirect: 'follow'
    };
    
    fetch(`${apiIp}/downdate/${queueID}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${apiIp}/readTVCall`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.length > 0){
        setPoint(result[0].point_id);
        setType(result[0].type);
        setQueue(result[0].queue);
        setQueueID(result[0].queue_id);
        play();
        }else{
          console.log("No DATA!")
        }
       
      })
      .catch(error => console.log('error', error));
  };

  const playlist = [
    require('./sound/output.mp3')
  ].filter(Boolean);

  let currentTrackIndex = 0;

  const playNextTrack = () => {
      updateData();
      console.log(isPlaying);
      setIsPlaying(false)
    }
  

  const play = () => {
    audioRef.current.src = playlist[currentTrackIndex];
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true)
    console.log(isPlaying)
    
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
      {/* <button onClick={fetchData}>
        Play
      </button> */}
      <audio ref={audioRef} controls onEnded={playNextTrack} style={{ display: 'none' }} />
      <QueueMonitor />
    </React.Fragment>
  );
}
