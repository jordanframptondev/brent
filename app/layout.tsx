import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JB|D Custom Home Design",
  description:
    "Custom home architecture and design. Crafting distinctive residences in Utah's mountain communities.",
  icons: {
    icon: [
      { url: "/favicon-no-tagline/favicon.ico", sizes: "any" },
      { url: "/favicon-no-tagline/jbd-favicon-no-tagline-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-no-tagline/jbd-favicon-no-tagline-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon-no-tagline/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
