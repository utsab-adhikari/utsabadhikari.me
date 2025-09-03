import ProvidersWrapper from "@/components/ProvidersWraper";
import "./globals.css";
import { Inter } from "next/font/google";
import { FaUser } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Utsab Adhikari | Portfolio",
  description:
    "Discover the professional portfolio of Utsab Adhikari — a passionate IT engineering student showcasing projects, skills, and achievements in a modern 3-section scroll-snapping layout.",
  metadataBase: new URL("https://utsabadhikari.me"),
  openGraph: {
    title: "Utsab Adhikari | Portfolio",
    description:
      "Explore the professional portfolio of Utsab Adhikari, featuring projects, skills, and achievements.",
    url: "https://utsabadhikari.me",
    siteName: "Utsab Adhikari",
    images: [
      {
        // Normally you would provide a static image URL here
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utsab Adhikari - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: <FaUser />, // This works for components/icons usage within the app
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
