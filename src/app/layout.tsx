import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import StickyFooterBar from "@/components/StickyFooterBar";
import { SignupModalProvider } from "@/components/signup/SignupModalContext";
import SignupModal from "@/components/signup/SignupModal";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050506",
};

export const metadata: Metadata = {
  title: "Stoke Club",
  description: "Newport Beach surf rock.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${bricolage.variable} h-full`}>
      <body className="min-h-full">
        <SignupModalProvider>
          <Nav />
          {children}
          <SiteFooter />
          <StickyFooterBar />
          <SignupModal />
        </SignupModalProvider>
      </body>
    </html>
  );
}
