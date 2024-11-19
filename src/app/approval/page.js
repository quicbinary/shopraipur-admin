// pages/approval.js
import Head from 'next/head';
import Header from "@/components/header";
import ShopApproval from "@/components/shopapproval";
import Productapproval from "@/components/productapproval"
import Adsapproval from "@/components/adsapproval";
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
      <div className="bg-gray-100 flex flex-col">
        <Header />
        <ShopApproval />
        <Productapproval/>
        <Adsapproval/>
      </div>
    </>
  );
}
