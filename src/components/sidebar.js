"use client"; // Enables hooks in client components
import { useRouter, usePathname } from "next/navigation";
import {AiFillHome,AiOutlineAppstore,AiOutlineCheckCircle,AiOutlineShop,} from "react-icons/ai"; // Import React Icons
import { FaUserTie, FaClipboardList, FaArrowUp, FaUserCircle } from "react-icons/fa";
import { MdInsights } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Updated menu items with React Icon components
  const menuItems = [
    { path: "/dashboard", icon: <AiFillHome />, label: "Dashboard" },
    { path: "/categories", icon: <AiOutlineAppstore />, label: "Categories" },
    { path: "/approval", icon: <AiOutlineCheckCircle />, label: "Approval" },
    { path: "/shop", icon: <AiOutlineShop />, label: "Shops" },
    { path: "/product", icon: <FaClipboardList />, label: "Products" },
    { path: "/admin", icon: <FaUserTie />, label: "Admin" },
    { path: "/ads", icon: <FaArrowUp />, label: "Ads" }, // Corrected icon
    { path: "/profile", icon: <FaUserCircle />, label: "My Profile" },
    { path: "/view", icon: <MdInsights />, label: "Views" },
  ];

  const navigateTo = (path) => {
    router.push(path); // Navigate programmatically
  };

  return (
    <div className="bg-purple-600 text-white min-h-screen w-64 p-6 sticky top-0">
      <div className="text-2xl font-bold mb-10">Shop Raipur</div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigateTo(item.path)}
            className={`flex items-center w-full px-6 py-3 text-sm font-montserrat font-medium  space-x-3 rounded-md ${
              pathname === item.path
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-purple-500 text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className="mt-10 w-full bg-purple-500 p-3 rounded-md font-semibold text-white"
        onClick={() => navigateTo("/logout")} // Example logout redirect
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
