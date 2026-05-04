import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JB|D Custom Home Design",
  description:
    "Custom home architecture and design. Crafting distinctive residences in Utah's mountain communities.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/jbd-favicon-no-tagline-clean-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/jbd-favicon-no-tagline-clean-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
