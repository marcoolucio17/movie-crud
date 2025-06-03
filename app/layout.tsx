import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineTec",
  description: "CRUD Individual",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/cinetec.png',
        href: '/images/cinetec.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/cinetec.png',
        href: '/images/cinetec.png',
      },
    ],
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
