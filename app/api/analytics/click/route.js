import { pool } from "@/lib/db";
import { initDB } from "@/lib/initDB";

export async function GET() {
  try {
    await initDB(); // ✅ inside function

    const result = await pool.query(`
      SELECT content_id, button_label, COUNT(*) AS total_clicks
      FROM button_clicks
      GROUP BY content_id, button_label
      ORDER BY total_clicks DESC;
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching analytics" }, { status: 500 });
  }
}