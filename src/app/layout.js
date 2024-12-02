"use client"
import Sidebar from "@/components/sidebar";
import "./globals.css";
import { usePathname } from "next/navigation";
import React from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {/* Render Sidebar only if the current path is not "/login" */}
          {pathname !== "/login" && <Sidebar />}
          <main className={`flex-1 ${pathname === "/login" ? "w-full" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
