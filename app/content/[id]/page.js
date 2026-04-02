"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.css";
import ActionButtons from "@/components/ActionButtons";
import VideoPlayer from "@/components/VideoPlayer";
import { contentData } from "@/lib/contentData";

// Page to display selected chapter content with text, video, and actions
// Uses contentId from URL to fetch corresponding content data
export default function ContentPage() {
  const params = useParams();
  // Extract content ID from URL and get related content from data file
  const contentId = Number(params.id);

  const data = contentData[contentId];

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          {data?.title || `Chapter ${contentId}`}
        </h1>
        <p className={styles.subtitle}>
          Learn concepts with video and interactive actions
        </p>
      </div>

      {/* CONTENT */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Topic Explanation</h2>
        <p className={styles.text}>
          {data?.text || "No content available"}
        </p>
      </div>

      {/* VIDEO */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Video Lesson</h2>
        {data?.video ? (
          <VideoPlayer
            contentId={contentId}
            videoUrl={data.video}
          />
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* BUTTONS */}
      <div className={styles.actionsWrapper}>
        <ActionButtons contentId={contentId} />
      </div>

    </div>
  );
}

