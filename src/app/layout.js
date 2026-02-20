import BackgroundParticles from "@/components/BackgroundParticles";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CryptoPulse | Market Dashboard",
  description: "Real-time crypto tracking",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <BackgroundParticles />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
