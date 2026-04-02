"use client";
import Link from "next/link";

// List of all available books shown on homepage

const books = [
  { id: 1, title: "Data Structures" },
  { id: 2, title: "Web Development" },
  { id: 3, title: "Operating Systems" },
  { id: 4, title: "Database Systems" },
  { id: 5, title: "Machine Learning" },
];

// Home page component that displays all books

export default function Home() {
  return (
    <div className="container">
      <h1 className="heading">📚 Books</h1>

      <div className="grid">
        {books.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`}>
            <div className="card">

              {/* ICON */}
              <div className="icon">📚</div>

              {/* TITLE */}
              <h2>{book.title}</h2>

              {/* ACTION */}
              <p className="linkText">View Chapters →</p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}