"use client";
import React, { useEffect, useState } from "react";
import Addproduct from "@/components/product/addproduct";
import Filterproduct from "@/components/product/filterproduct";
import Productview from "@/components/product/productview";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data to state
    } else {
      router.push("/notfound"); // Redirect to 404 page if no user is found
    }
  }, [router]); // Ensure that router is used as a dependency

  return (
    <div>
      <Addproduct />
      <Filterproduct />
      <Productview />
    </div>
  );
}
