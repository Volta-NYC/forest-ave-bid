import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// League Spartan via Google Fonts is not in Next.js built-in list,
// so we load it as a CSS variable via the @import in globals or use
// a next/font/google workaround. We'll declare the variable manually
// and load via <link> in layout.
const leagueSpartan = {
  variable: "--font-headline",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://forestavenuebid.com"),
  title: {
    default: "Forest Avenue BID | Staten Island, NY",
    template: "%s | Forest Avenue BID",
  },
  description:
    "The Forest Avenue Business Improvement District supports local businesses, drives commercial revitalization, and builds community along Staten Island's Forest Avenue corridor.",
  keywords: [
    "Forest Avenue BID",
    "Staten Island business improvement district",
    "Forest Avenue businesses",
    "Staten Island commerce",
    "West Brighton",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forestavenuebid.com",
    siteName: "Forest Avenue BID",
    title: "Forest Avenue BID | Staten Island, NY",
    description:
      "Supporting local businesses and building community along Staten Island's Forest Avenue corridor.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Avenue BID – Staten Island, NY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest Avenue BID | Staten Island, NY",
    description:
      "Supporting local businesses and building community along Staten Island's Forest Avenue corridor.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
