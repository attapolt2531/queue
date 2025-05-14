import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QueueMonitor from './queueMonitor';
import { apiIp } from './config';

export default function AudioPlayer() {
  const [queueData, setQueueData] = useState(null); // { qid, queue, fullname, point_id }
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);

  // Fetch queue every second until we get a new one
  useEffect(() => {
    let poller;
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiIp}/readTVCall`);
        const data = await res.json();
        if (data.length > 0) {
          // ถ้าเจอคิวใหม่และยังไม่เคยเล่น
          const item = data[0];
          if (!queueData || item.qid !== queueData.qid) {
            setQueueData(item);
            clearInterval(poller);
          }
        }
      } catch (err) {
        console.error('Error fetching queue:', err);
      }
    };

    fetchData();
    poller = setInterval(fetchData, 1000);
    return () => clearInterval(poller);
  }, [queueData]);

  // เมื่อ queueData เปลี่ยน ให้ขอสร้างไฟล์เสียงและเล่น
  useEffect(() => {
    if (!queueData) return;

    let objectUrl;
    let deleteTimer;

    const generateAndPlay = async () => {
      try {
        // 1. สร้างเสียงจาก backend
        const payload = {
          name: `${queueData.vn}${queueData.point_id}`,
          text: `ขอเชิญ ${queueData.fullname} ที่ช่องรับยาหมายเลข ${queueData.point_id} ค่ะ`,
        };
        const genRes = await fetch(`${apiIp}/generate-audio`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const genJson = await genRes.json();
        if (!genJson.success) throw new Error(genJson.error || 'Generate failed');

        // 2. ดึงไฟล์เสียงแบบ blob
        const audioRes = await axios.get(`${apiIp}/api/getAudio`, { responseType: 'blob' });
        objectUrl = URL.createObjectURL(new Blob([audioRes.data], { type: 'audio/mp3' }));
        setAudioUrl(objectUrl);

        // 3. เล่นเสียง
        const audioEl = audioRef.current;
        audioEl.muted = false;
        audioEl.volume = 1.0;
        audioEl.load();
        await audioEl.play();

        // 4. เมื่อเล่นจบ ทำงาน Update / Delete
        audioEl.onended = async () => {
          try {
            await fetch(`${apiIp}/downdate/${queueData.qid}`, { method: 'PATCH' });
            await fetch(`${apiIp}/api/deleteAudio`, { method: 'DELETE' });
          } catch (e) {
            console.error('Post-play cleanup error:', e);
          }
          setQueueData(null);
        };
      } catch (err) {
        console.error('Audio generation/play error:', err);
        setQueueData(null);
      }
    };

    generateAndPlay();

    return () => {
      // Cleanup URL object และ timers
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (deleteTimer) clearTimeout(deleteTimer);
    };
  }, [queueData]);

  return (
    <>
      <audio ref={audioRef} style={{ display: 'none' }}>
        <source src={audioUrl} type="audio/mp3" />
      </audio>
      <QueueMonitor />
    </>
  );
}
