import { pool } from "@/lib/db";
import { initDB } from "@/lib/initDB";
await initDB();
export async function GET() {
  try {
    const result = await pool.query(`
      WITH clicks AS (
        SELECT 
          content_id,
          COUNT(*) AS total_clicks,

          COUNT(*) FILTER (WHERE button_label = 'Download Notes') AS download_notes,
          COUNT(*) FILTER (WHERE button_label = 'Take Quiz') AS quiz_taken

        FROM button_clicks
        GROUP BY content_id
      ),

      videos AS (
        SELECT 
          content_id,
          SUM(watched_seconds) AS total_watch_time
        FROM video_events
        GROUP BY content_id
      )

      SELECT 
        c.content_id,

        c.total_clicks,
        c.download_notes,
        c.quiz_taken,
        COALESCE(v.total_watch_time, 0) AS total_watch_time,

        (
          c.total_clicks 
          + c.download_notes 
          + c.quiz_taken 
          + COALESCE(v.total_watch_time, 0)
        ) / 10.0 AS engagement_score

      FROM clicks c
      LEFT JOIN videos v
      ON c.content_id::int = v.content_id

      ORDER BY engagement_score DESC;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching engagement analytics" },
      { status: 500 }
    );
  }
}