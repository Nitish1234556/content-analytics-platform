import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Content Analytics Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <nav className="navbar">
          <h2 className="logo">Content Analytics Platform</h2>

          <div className="navLinks">
            <Link href="/">Home</Link>
            <Link href="/analytics">Dashboard</Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="container">
          {children}
        </main>

      </body>
    </html>
  );
}