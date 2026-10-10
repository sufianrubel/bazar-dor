import { Geist, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { siteConfig } from "@/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = siteConfig.metadata;

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" data-scroll-behavior="smooth">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
