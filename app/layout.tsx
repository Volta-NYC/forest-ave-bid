import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

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
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
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
