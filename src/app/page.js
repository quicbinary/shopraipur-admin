"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check for user data in local storage
    const user = localStorage.getItem("user");

    if (user) {
      // If user exists, redirect to dashboard
      router.push("/dashboard");
    } else {
      // If user doesn't exist, redirect to login
      router.push("/login");
    }
  }, [router]);

  return null; // Prevent rendering during redirection
}
