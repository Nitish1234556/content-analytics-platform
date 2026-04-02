"use client";

import { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import AnalyticsChart from "@/components/AnalyticsChart";
import { getChapterName } from "@/lib/contentHelper";

// Analytics dashboard to display user interaction and engagement data
export default function AnalyticsPage() {
  const [clickData, setClickData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  // Fetch analytics data from backend APIs when page loads
  useEffect(() => {
    fetch("/api/analytics/click")
      .then((res) => res.json())
      .then(setClickData);

    fetch("/api/analytics/video")
      .then((res) => res.json())
      .then(setVideoData);

    fetch("/api/analytics/engagement")
      .then((res) => res.json())
      .then(setEngagementData);
  }, []);

  // Calculate total clicks and find most engaged content
  const totalClicks = clickData.reduce(
    (sum, item) => sum + Number(item.total_clicks),
    0
  );

  const topContent = engagementData.length > 0 ? engagementData[0] : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analytics Dashboard</h1>

      {/* KPI CARDS */}
      <div className={styles.kpiGrid}>
        <div className={styles.card}>
          <h3>Total Clicks</h3>
          <p>{totalClicks}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Videos</h3>
          <p>{videoData.length}</p>
        </div>
      </div>

      {/* MOST ENGAGED CONTENT */}
      <div className={styles.card}>
        <h3>Most Engaged Content</h3>
        {topContent ? (
          <p>
            {getChapterName(topContent.content_id)} with score{" "}
            <b>{Number(topContent.engagement_score).toFixed(2)}</b>
          </p>
        ) : (
          <p>No data yet</p>
        )}
        
      </div>

      {/* BUTTON CLICKS TABLE */}
      <div className={styles.card}>
        <h2>Button Clicks</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Button</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {clickData.map((item, i) => (
              <tr key={i}>
                <td>{getChapterName(item.content_id)}</td>
                <td>{item.button_label}</td>
                <td>{item.total_clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIDEO STATS TABLE */}
      <div className={styles.card}>
        <h2>Video Stats</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Total Watch Time</th>
              <th>Avg Watch Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(videoData) &&
              videoData.map((item, i) => (
                <tr key={i}>
                  <td>
                    {getChapterName(item.video_id?.split("_")[1])}
                  </td>
                  <td>{item.total_watch_time}</td>
                  <td>{Math.round(item.avg_watch_time)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ENGAGEMENT TABLE */}
      <div className={styles.card}>
        <h2>Content Engagement Score</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Total Clicks</th>
              <th>Downloads</th>
              <th>Quiz Taken</th>
              <th>Watch Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(engagementData) &&
              engagementData.map((item, i) => (
                <tr key={i}>
                  <td>{getChapterName(item.content_id)}</td>
                  <td>{item.total_clicks}</td>
                  <td>{item.download_notes}</td>
                  <td>{item.quiz_taken}</td>
                  <td>{item.total_watch_time}</td>
                  <td>
                    <b>{Number(item.engagement_score).toFixed(2)}</b>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 ENGAGEMENT CHART */}
      <div className={styles.card}>
        <h2>Engagement Score Distribution</h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnalyticsChart data={engagementData} />
        </div>
      </div>
    </div>
  );
}