import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Takshak Singhania — Software Engineer & Creative Developer",
  description:
    "Personal portfolio and interactive engineering showcase of Takshak Singhania. Full-Stack Products, Backend Systems, Real-Time Systems, and Creative Development.",
  authors: [{ name: "Takshak Singhania" }],
  keywords: [
    "Takshak Singhania",
    "Software Engineer",
    "Full-Stack Developer",
    "IIIT Bhopal",
    "Sentosa QR Ordering",
    "PayFlow",
    "Routewise",
    "Creative Development",
    "React",
    "TypeScript",
    "Node.js",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-base text-text-main font-sans antialiased selection:bg-white selection:text-black min-h-screen">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
