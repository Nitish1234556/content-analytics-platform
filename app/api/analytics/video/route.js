import { pool } from "@/lib/db";
import { initDB } from "@/lib/initDB";

export async function GET() {
  try {
    await initDB(); // ✅ ensure tables exist

    const result = await pool.query(`
      SELECT 
        video_id,
        SUM(watched_seconds) AS total_watch_time,
        AVG(watched_seconds) AS avg_watch_time
      FROM video_events
      GROUP BY video_id
      ORDER BY total_watch_time DESC;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching video analytics" }, { status: 500 });
  }
}