import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burnout Motors — Norway's First GT3 Student Team",
  description: "Burnout Motors is a student-run engineering project at the University of Oslo. We design, build, test and race a GT3 competition car.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
