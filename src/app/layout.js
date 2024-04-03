import React from "react";
import "./globals.css";

export const metadata = {
  title: "Star Wars Explorer for STARNAVI",
  description: "Star Wars Explorer for STARNAVI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">{children}</body>
    </html>
  );
}
