"use client"; // Enables hooks in client components
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillHome, AiOutlineAppstore, AiOutlineCheckCircle, AiOutlineShop } from "react-icons/ai"; // Import React Icons
import { FaUserTie, FaClipboardList, FaArrowUp, FaUserCircle } from "react-icons/fa";
import { MdInsights } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data from localStorage
    }
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      localStorage.removeItem("user");
      router.replace("/");
    } else {
      alert("Logout canceled!");
    }
  };

  // Menu items for Super Admin (all items)
  const allMenuItems = [
    { path: "/dashboard", icon: <AiFillHome />, label: "Dashboard" },
    { path: "/categories", icon: <AiOutlineAppstore />, label: "Categories" },
    { path: "/approval", icon: <AiOutlineCheckCircle />, label: "Approval" },
    { path: "/shop", icon: <AiOutlineShop />, label: "Shops" },
    { path: "/product", icon: <FaClipboardList />, label: "Products" },
    { path: "/admin", icon: <FaUserTie />, label: "Admin" },
    { path: "/ads", icon: <FaArrowUp />, label: "Ads" },
    { path: "/profile", icon: <FaUserCircle />, label: "My Profile" },
    { path: "/view", icon: <MdInsights />, label: "Views" },
  ];

  // Menu items for Admin (limited items)
  const adminMenuItems = [
    { path: "/dashboard", icon: <AiFillHome />, label: "Dashboard" },
    { path: "/approval", icon: <AiOutlineCheckCircle />, label: "Approval" },
    { path: "/shop", icon: <AiOutlineShop />, label: "Shops" },
    { path: "/product", icon: <FaClipboardList />, label: "Products" },
    { path: "/ads", icon: <FaArrowUp />, label: "Ads" },
    { path: "/profile", icon: <FaUserCircle />, label: "My Profile" },
  ];

  const navigateTo = (path) => {
    router.push(path);
  };

  if (!user) {
    return null; // Or show a loading spinner while fetching user data
  }

  const menuItems = user.role === "Super Admin" ? allMenuItems : adminMenuItems;

  return (
    <div className="bg-purple-600 text-white min-h-screen w-64 p-6 sticky top-0">
      <div className="text-2xl font-montserrat font-bold mb-10">ShopRaipur</div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigateTo(item.path)}
            className={`flex items-center w-full px-6 py-3 text-sm font-montserrat font-medium space-x-3 rounded-md ${
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
        className="mt-10 w-full bg-purple-500 p-3 rounded-md font-semibold font-montserrat font-medium text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
