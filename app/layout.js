import localFont, { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Schedulify",
  description: "Generated by create next app",
};

const inter= Inter({subsets:["latin"]})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${inter.className}  antialiased`}
      >
        <Header/>
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

        {children}
        </main>
        <footer className="py-4 bg-blue-100">
          <div className="container text-center">
            <p>Made With 💖 by Nitin yadav</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
