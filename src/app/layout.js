import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wasted Potential Studio",
  description: "Creative Studio",  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../public/images/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}