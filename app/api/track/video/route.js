import { pool } from "@/lib/db";
import { initDB } from "@/lib/initDB";

await initDB();
export async function POST(req) {
  try {
    const body = await req.json();

    const { user_id, video_id, content_id, watched_seconds } = body;

    await pool.query(
      `INSERT INTO video_events (user_id, video_id, content_id, watched_seconds)
       VALUES ($1, $2, $3, $4)`,
      [user_id, video_id, content_id, watched_seconds]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error saving video data" }, { status: 500 });
  }
}