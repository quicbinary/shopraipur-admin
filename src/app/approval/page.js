// pages/approval.js
"use client"
import ShopApproval from "@/components/approval/shopapproval";
import Productapproval from "@/components/approval/productapproval"
import Adsapproval from "@/components/approval/adsapproval";
import Header from "@/components/header"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApprovalPage() {
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
    <>
      <div className="bg-gray-100 p-10 space-y-10">
        <Header title={"Approval"}/>
        <ShopApproval />
        <Productapproval/>
        <Adsapproval/>
      </div>
    </>
  );
}