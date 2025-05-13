import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CssBaseline,
  Paper,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { amber, blueGrey } from "@mui/material/colors";
import { apiIp } from "./config";

// effect กระพริบ
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function QueueDisplay() {
  const [queues, setQueues] = useState([]);
  const [now, setNow] = useState(new Date());
  const videoRef = useRef(null);

  const DEFAULT_VOLUME = 0.10;
  // current queue and history
  const current = queues[0] || {};
  const history = queues.slice(1);

  // fetch queues and update time
  useEffect(() => {
    const fetchQueues = () => {
      fetch(`${apiIp}/readTV`)
        .then((r) => r.json())
        .then(setQueues)
        .catch(console.error);
    };
    fetchQueues();
    const qInterval = setInterval(fetchQueues, 1000);
    const tInterval = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearInterval(qInterval);
      clearInterval(tInterval);
    };
  }, []);

  // initialize video volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = DEFAULT_VOLUME;
    }
  }, []);

  // mute video while calling new queue, then restore
  useEffect(() => {
    if (!videoRef.current) return;
    // mute immediately when current changes
    videoRef.current.muted = true;
    // unmute after 2 seconds
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
      }
    }, 7000);
    return () => clearTimeout(timer);
  }, [current.queue]);

  const formatDate = (d) =>
    d.toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
  const formatTime = (d) =>
    d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "99vh", position: "relative" }}>
        {/* Left: Video */}
        <Box sx={{ flex: 2, position: "relative", zIndex: 2 }}>
          <video
            ref={videoRef}
            src="/videos/7.mp4"
            autoPlay
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Date & Time */}
          <Box sx={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 1, zIndex: 3 }}>
            <Typography sx={{ bgcolor: "#16a34a", px: 2, borderRadius: 1, color: "#fff" }}> {formatDate(now)} </Typography>
            <Typography sx={{ bgcolor: "#fff", px: 2, borderRadius: 1, color: "#000" }}> {formatTime(now)} </Typography>
          </Box>
          {/* Welcome text */}
          <Typography
            sx={{ position: "absolute", bottom: 16, left: 16, bgcolor: "rgba(0,0,0,0.7)", px: 2, py: 1, borderRadius: 1, color: "#fff", zIndex: 3 }}
          >
            ระบบคิวงานเภสัชกรรม โรงพยาบาลสร้างคอม
          </Typography>
        </Box>

        {/* Right: Current queue & Table */}
        <Box sx={{ flex: 1, p: 4, overflowY: "auto", bgcolor: "#ffffff", position: "relative", zIndex: 2 }}>
          {/* Current queue */}
          <Paper elevation={8} sx={{ mb: 4, p: 3, textAlign: "center", bgcolor: amber[500], zIndex: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}> คิวที่กำลังเรียก </Typography>
            <Typography variant="h1" sx={{ color: "#fff", fontSize: "6rem", fontWeight: "bold", animation: `${pulse} 1.5s infinite ease-in-out` }}>
              {current.queue || "-"}
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff", mt: 1 }}> ช่องรับยาหมายเลข : {current.point_id || "-"} </Typography>
          </Paper>

          {/* History list - Improved Style */}
          <Paper elevation={4} sx={{ bgcolor: "#ffffff", p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: blueGrey[900] }}>
              คิวที่เรียกแล้ว
            </Typography>
            {history.length > 0 ? (
              history.map((q, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: i % 2 === 0 ? "#f9f9f9" : "#e0e0e0",
                    px: 3,
                    py: 2,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#374151" }}>
                    คิวที่ {q.queue}
                  </Typography>
                  <Typography sx={{ fontSize: "1.8rem", color: "#111827" }}>
                    ช่องรับยาหมายเลข {q.point_id}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography align="center" sx={{ py: 4, color: "#666" }}>
                ยังไม่มีคิวที่เรียกไปแล้ว
              </Typography>
            )}
          </Paper>
          {/* Logo at bottom right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 50,
              right: 60,
              zIndex: 3,
              bgcolor: "rgba(255,255,255,0.8)",
              p: 1,
              borderRadius: 1,
            }}
          >
            <img src="/logosk.png" alt="Hospital Logo" style={{ height: 150 }} />
          </Box>

        </Box>
      </Box>
    </>
  );
}
