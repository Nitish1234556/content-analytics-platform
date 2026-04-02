import { pool } from "@/lib/db"; // use your existing db.js

export async function POST(req) {
  try {
    const body = await req.json();

    const { user_id, button_label, content_id } = body;

    await pool.query(
      `INSERT INTO button_clicks (user_id, button_label, content_id)
       VALUES ($1, $2, $3)`,
      [user_id, button_label, content_id]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}