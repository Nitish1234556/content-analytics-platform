#  Content Analytics Platform

##  Overview

This project is a **Content Analytics Platform** that tracks how users interact with educational content and provides meaningful insights through an analytics dashboard.

The system allows users to:

* Browse books and chapters
* Watch video lessons
* Perform actions like quiz, download notes, and mark complete

All interactions are tracked and analyzed to generate real-time analytics.

---

#  Database Schema (with Explanation)

The database is designed using an **event-based model**, where each user interaction is stored as a separate event.

## 1. `button_clicks`

Stores all button interactions.

| Field        | Type      | Description                           |
| ------------ | --------- | ------------------------------------- |
| id           | SERIAL    | Unique identifier                     |
| user_id      | TEXT      | User performing action                |
| button_label | TEXT      | Type of action (quiz, download, etc.) |
| content_id   | TEXT      | Content where action occurred         |
| clicked_at   | TIMESTAMP | Time of action                        |

Explanation:
Each button click is stored as a separate row. This allows flexible aggregation (per button, per content, etc.).

---

## 2. `video_events`

Stores video watch sessions.

| Field           | Type      | Description         |
| --------------- | --------- | ------------------- |
| id              | SERIAL    | Unique identifier   |
| user_id         | TEXT      | User watching video |
| video_id        | TEXT      | Video identifier    |
| content_id      | INTEGER   | Associated content  |
| watched_seconds | INTEGER   | Duration watched    |
| recorded_at     | TIMESTAMP | Time of event       |

Explanation:
Instead of tracking only "video started", the system tracks **actual watch duration**, which gives meaningful insights.

---

## 3. `custom_events` (optional)

| Field      | Type      | Description       |
| ---------- | --------- | ----------------- |
| id         | SERIAL    | Unique identifier |
| user_id    | TEXT      | User              |
| event_type | TEXT      | Custom action     |
| value      | INTEGER   | Optional value    |
| created_at | TIMESTAMP | Time              |

Explanation:
Reserved for future extensibility.

---

#  System Architecture

The system follows a **full-stack architecture using Next.js**.

## 1. Frontend (UI Layer)

* Built with Next.js (App Router)
* Displays:

  * Content pages
  * Video player
  * Action buttons
  * Analytics dashboard

## 2. Backend (API Layer)

* Implemented using Next.js API routes
* Handles:

  * Event tracking (`/api/track/*`)
  * Data aggregation (`/api/analytics/*`)

## 3. Database Layer

* PostgreSQL
* Stores all events and supports aggregation queries

---

##  Data Flow

### Video Tracking

1. User plays video
2. On pause/end → watch time calculated
3. Data sent to `/api/track/video`
4. Stored in `video_events`

---

### Button Tracking

1. User clicks button
2. Request sent to `/api/track/click`
3. Stored in `button_clicks`

---

### Analytics

1. Dashboard calls `/api/analytics/*`
2. Backend runs SQL queries
3. Aggregated data returned and displayed

---

#  Performance Decisions

## 1. Event-Based Tracking

* Each interaction is stored separately
* Avoids overwriting data
* Enables flexible analytics

---

## 2. Aggregation at Query Time

* No redundant storage of computed values
* Uses SQL functions like:

  * `COUNT()`
  * `SUM()`
  * `AVG()`

Benefit: Real-time and accurate analytics

---

## 3. Lightweight Frontend

* Data fetched only once using `useEffect`
* Avoids unnecessary re-renders

---

## 4. Top-K Visualization

* Graph shows only top 5 content
* Table shows full data

👉 Improves readability and performance

---

# 🎯 Third Analytic: Engagement Score

## Formula:

Engagement = (Clicks + Downloads + Quiz + WatchTime)/10

---

## 💡 Justification

This metric combines multiple user behaviors into a **single meaningful score**:

* Clicks → interaction intent
* Downloads → deeper engagement
* Quiz → learning effort
* Watch time → content consumption

👉 Dividing by 10 normalizes values to keep them readable.

---

## Why This is Useful

* Provides a **holistic view** of content performance
* Avoids bias toward a single metric
* Helps identify most engaging content

---

# ⚙️ Automatic Database Initialization

The system uses:

```sql
CREATE TABLE IF NOT EXISTS
```

Implemented in:

```
lib/initDB.js
```

Ensures:

* Tables are created automatically
* No manual setup required
* Works in fresh deployment

---

#  Setup Instructions (Local)

## 1. Clone repository

```bash
git clone <repo-url>
cd content-analytics-platform
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment

Create `.env.local`:

```env
DATABASE_URL=your_postgresql_connection_string
```

---

## 4. Run the app

```bash
npm run dev
```

---

## 5. Open browser

```
http://localhost:3000
```

---

## Important

* No need to manually create tables
* Tables are automatically created on first API call

---

#  Demo

The demo video shows:

* Content browsing
* Button clicks
* Video tracking
* Analytics dashboard updating
Video Link :- https://youtu.be/HE7LXyifp3g
---

# 🏁 Conclusion

This project demonstrates:

* Full-stack development using Next.js
* Event-driven analytics system
* Real-time data aggregation
* Thoughtful metric design

---

