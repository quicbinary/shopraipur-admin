// app/layout.js
"use client"
import { usePathname } from "next/navigation"; // Import the usePathname hook
import Sidebar from "@/components/sidebar";
import "./globals.css";
import { Montserrat } from 'next/font/google';

// Load Montserrat font with multiple weights
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat', // This will create a variable to reference
  weight: ['300', '400', '500', '600', '700'], // Load multiple weights
});
 
export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  const isLoginPage = pathname === "/login"; // Check if the current path is "/login"

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* Render Sidebar only if the current path is not "/login" */}
          {!isLoginPage && <Sidebar />}
          <main className={`flex-1 ${isLoginPage ? "w-full" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
