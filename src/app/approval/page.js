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



// Header Component (reused from Dashboard)
// function Home() {
//   return (
//     <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg mb-8 w-full">
//       <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
//       <div className="flex items-center space-x-2">
//         <Image
//           src="/assets/logo.jpg"
//           alt="Profile"
//           width={150}
//           height={300}
//           className="w-10 h-10 rounded-full"
//         />
//         <span className="font-semibold text-gray-800">Nikhil Mitra</span>
//       </div>
//     </div>
//   );
// }
