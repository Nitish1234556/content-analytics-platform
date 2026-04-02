"use client";

import YouTube from "react-youtube";
import { useRef } from "react";
// Video player component to play YouTube video and track watch time
export default function VideoPlayer({ contentId, videoUrl }) {
  const startTimeRef = useRef(null);

// Extract video ID from YouTube embed URL
  const getVideoId = (url) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);

  // Calculate watched time and send it to backend
  const saveWatchTime = async () => {
    if (!startTimeRef.current) {
      console.log("No start time");
      return;
    }

    const watched = Math.floor((Date.now() - startTimeRef.current) / 1000);

    console.log("WATCHED:", watched);

    if (watched <= 1) {
      startTimeRef.current = null;
      return;
    }
// Send watch time data to video tracking API
    try {
      await fetch("/api/track/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user_1",
          video_id: `video_${contentId}`,
          content_id: contentId,
          watched_seconds: watched,
        }),
      });

      console.log("✅ SENT TO API");
    } catch (err) {
      console.error("❌ API ERROR:", err);
    }

    startTimeRef.current = null;
  };

// Handle video play, pause, and end events
  const handleStateChange = (event) => {
    const state = event.data;

    console.log("STATE:", state);

    // PLAYING
    if (state === 1) {
      if (!startTimeRef.current) {
        console.log("▶️ START");
        startTimeRef.current = Date.now();
      }
    }

    //  PAUSED
    if (state === 2) {
      console.log("⏸️ PAUSE");
      saveWatchTime();
    }

    // ENDED
    if (state === 0) {
      console.log("⏹️ END");
      saveWatchTime();
    }
  };

  return (
    <YouTube
      videoId={videoId}
      onStateChange={handleStateChange}
      opts={{
        width: "100%",
        height: "400",
        playerVars: {
          autoplay: 0,
          rel: 0,
        },
      }}
    />
  );
}