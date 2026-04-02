"use client";
// Component to render action buttons and track user interactions
export default function ActionButtons({ contentId }) {
// Function to send button click data to backend API
  const handleClick = async (label) => {
    await fetch("/api/track/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "user_1",
        button_label: label,
        content_id: contentId,
      }),
    });

    // Show simple feedback message based on button clicked
    const messages = {
      mark_complete: "Marked as completed",
      take_quiz: "Quiz started",
      download_notes: "Notes downloaded",
    };

    alert(messages[label] || "Action performed");
  };
// Render buttons for different user actions
  return (
    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
      
      <button
        className="btn btn-primary"
        onClick={() => handleClick("mark_complete")}
      >
        ✔ Mark Complete
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => handleClick("take_quiz")}
      >
        🧠 Take Quiz
      </button>

      <button
        className="btn btn-warning"
        onClick={() => handleClick("download_notes")}
      >
        ⬇ Download Notes
      </button>

    </div>
  );
}