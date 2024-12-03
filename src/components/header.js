// components/Header.js
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800">Approval Platform</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Image
            src="/assets/logo.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700 ml-2">Nikhil Mitra</span>
        </div>
      </div>
    </header>
  );
}