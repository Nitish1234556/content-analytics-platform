"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const bookTitles = {
  1: "Data Structures",
  2: "Web Development",
  3: "Operating Systems",
  4: "Database Systems",
  5: "Machine Learning",
};

const chapterNames = {
  1: ["Arrays", "Stacks & Queues", "Trees"],
  2: ["HTML Basics", "CSS Styling", "JavaScript"],
  3: ["Processes", "Memory Management", "Deadlocks"],
  4: ["DBMS Intro", "SQL Basics", "Normalization"],
  5: ["ML Basics", "Supervised Learning", "Neural Networks"],
};

export default function BookPage() {
  const params = useParams();
  const bookId = Number(params.id);

  const chapters = chapterNames[bookId].map((title, index) => ({
    id: bookId * 100 + (index + 1),
    title,
  }));

  return (
    <div className="container">
      
      <h1 className="heading">
        {bookTitles[bookId]}
      </h1>

      <div className="grid">
        {chapters.map((chapter) => (
          <Link key={chapter.id} href={`/content/${chapter.id}`}>
            
            <div className="card chapterCard">

              {/* ICON */}
              <div className="icon">📖</div>

              {/* TITLE */}
              <h3>{chapter.title}</h3>

              {/* ACTION */}
              <p className="linkText">Open Content →</p>

            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}