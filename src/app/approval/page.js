// pages/approval.js
import Head from 'next/head';
import Image from 'next/image';
import ShopApproval from "@/components/approval/shopapproval";
import Productapproval from "@/components/approval/productapproval"
import Adsapproval from "@/components/approval/adsapproval";
import Header from "@/components/header"
export default function ApprovalPage() {
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