-- =========================
-- BUTTON CLICKS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS button_clicks (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  button_label TEXT,
  content_id TEXT,
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- VIDEO EVENTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS video_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  video_id TEXT,
  content_id INTEGER,
  watched_seconds INTEGER,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CUSTOM EVENTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS custom_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  event_type TEXT,
  value INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);