import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/custom/NavBar/NavBar";
import Footer from "@/components/custom/Footer";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://csitabmc.com"),
  title: "CSITABMC",
  description:
    "CSIT Association of Butwal Multiple Campus is Non profit, Non political association of CSIT Students of Butwal Multiple Campus.",
  openGraph: {
    images: {
      url: "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png",
      width: 1200,
      height: 630,
      alt: "CSIT Association of Butwal Multiple Campus",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader showSpinner={false} color="red" />
        <nav className="bg-background/60 backdrop-blur-xl shadow-sm fixed z-50 w-full top-0">
          <NavBar />
        </nav>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
