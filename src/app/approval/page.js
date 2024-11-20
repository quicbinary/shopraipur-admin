// pages/approval.js
import Head from 'next/head';
import Image from 'next/image';
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
      <div className="bg-gray-100 p-10 gap-4">
        <Header />
        <ShopApproval />
        <Productapproval/>
        <Adsapproval/>
      </div>
    </>
  );
}



// Header Component (reused from Dashboard)
function Home() {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg mb-8 w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/logo.jpg"
          alt="Profile"
          width={150}
          height={300}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold text-gray-800">Nikhil Mitra</span>
      </div>
    </div>
  );
}
