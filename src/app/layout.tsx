import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/global/Header/Navbar";
import Footer from "./components/global/Footer/Footer";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
});

export const metadata: Metadata = {
  title: {
    default: "Top Picks & Reviews!",
    template: "%s | Tastyeats",

  },
  description: "",
  // twitter: {
  //   card: "summary_large_image",
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.className} antialiased bg-slate-50`}>
        <NextTopLoader
          color="#f9a8d4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 0px #2299DD,0 0 0px #2299DD"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
