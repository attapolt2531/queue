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
    const currentAudioRef = audioRef.current;
  
    // เพิ่ม event listener สำหรับเมื่อไฟล์ MP3 ถูกเล่นจบ
    currentAudioRef.addEventListener('ended', () => {
      setIsPlaying(false);
      updateData();
      clearVariable();
      deleteAudio();
    });
  
    // ตอนที่ component ถูก unmount, ลบ event listener
    return () => {
      currentAudioRef.removeEventListener('ended', () => {
        setIsPlaying(false);
        updateData();
        clearVariable();
        deleteAudio();
      });
      // deleteAudio();
    };
  }); 

  

      const fetchAudio = async () => {
        try {
          const response = await axios.get(`${apiIp}/api/getAudio`, {
            responseType: 'blob',
          });
      
          const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
      
          if (response.status === 200) {
            setAudioUrl(url);
            console.log('URL : ', url);
            console.log('Status Code:', response.status);
            
            // เพิ่มเงื่อนไขให้ play() ทำงาน
            play();
            
          } else {
            console.log('Failed to fetch audio. Status Code:', response.status);
          }
        } catch (error) {
          console.error('Error fetching audio:', error);
        }
      };
      

      const play = () => {
        audioRef.current.load();
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current.play();
          setIsPlaying(true);
          console.log('isPlaying:', isPlaying);
      
          setTimeout(() => {
            setIsPlaying(false);
          }, audioRef.current.duration * 1000 + 1000); // รอจนกว่าจะจบไฟล์แล้วรอเพิ่มอีก 1 วินาที
      
          setTimeout(() => {
            // ทำการ unmount component ทันทีหลังจากที่ไฟล์เสียงเล่นเสร็จสิ้น
            // คุณอาจจะใช้ hook ต่างๆ เพื่อทำให้ unmount ได้
            console.log('Component unmounted');
          }, audioRef.current.duration * 1000 + 2000); // รอจนกว่าจะจบไฟล์แล้วรอเพิ่มอีก 2 วินาที
        });
      };

  // const play = () => {
  //   audioRef.current.load();
  //   audioRef.current.addEventListener('canplaythrough', () => {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     console.log(isPlaying);
      
  //   });
  // };


  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${apiIp}/readTVCall`, requestOptions)
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
      await axios.delete(`${apiIp}/api/deleteAudio`);
      console.log('File deleted successfully');
      clearVariable();
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
      .then(result => {
        console.log(result);
        
      })
      .catch(error => console.log('error', error));
  };
  

  const clearVariable = () => {
    setPoint('');
        setName('');
        setQueue('');
        setQueueID('');
        console.log('success fully clearVariable')
  }

  useEffect(() => {
   
    // ตรวจสอบว่า isPlaying เป็น false และมีข้อมูลเพียงพอหรือไม่ แล้วทำงาน fetchData
    if (!isPlaying) {
      fetchData();
      const intervalID = setInterval(fetchData, 1000);
  
      // ตรวจสอบว่ามีข้อมูลเพียงพอหรือไม่ แล้วทำงาน generateAudio
      if (Point && Name && Queue && queueID) {
        fetchAudio()
        return () => {
          clearInterval(intervalID);
        };
      }
    }
  });
  

  // useEffect(() => {
  //   fetchData();
  //   const intervalID = setInterval(fetchData,1000)
  //   // ตรวจสอบว่ามีข้อมูลเพียงพอหรือไม่ แล้วทำงาน generateAudio
  //   if (Point && Name && Queue && queueID) {
  //     generateAudio();
  //     return()=>{
  //       clearInterval(intervalID)
  //     }
  //   }
  // }); // ให้ useEffect ทำงานเมื่อ component ถูก mount เท่านั้น

  return (
    <React.Fragment>
      {/* <button onClick={fetchData}>fetchData</button>
      <button onClick={generateAudio}>generate</button>
      <button onClick={fetchAudio}>FetchAudio</button>
      <button onClick={play}>Play</button> {/* เล่นไฟล์จบแล้วถึงทำขั้นตอนต่อไป 
      <button onClick={deleteAudio}>Delete</button>
      <button onClick={updateData}>Updatedata</button>
      <button onClick={clearVariable}>clearVariable</button> */}
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <QueueMonitor />
    </React.Fragment>
  );
}
