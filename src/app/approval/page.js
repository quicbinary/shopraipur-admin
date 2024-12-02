// pages/approval.js
import Head from 'next/head';
import Image from 'next/image';
import ShopApproval from "@/components/approval/shopapproval";
import Productapproval from "@/components/approval/productapproval"
import Adsapproval from "@/components/approval/adsapproval";
export default function ApprovalPage() {
  return (
    <>
      <Head>
        <title>Approval UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </Head>
      <div className="bg-gray-100 p-10 space-y-10">
        
        <ShopApproval />
        <Productapproval/>
        <Adsapproval/>
      </div>
    </>
  );
}
