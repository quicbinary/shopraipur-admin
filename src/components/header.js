// components/Header.js
import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-lg">
      <h1 className="text-xl font-semibold">Approval</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Nikhil Mitra</span>
        <Image
          src="/assets/logo.jpg"
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
