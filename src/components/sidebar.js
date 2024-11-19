"use client"; // Enables hooks in client components
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { path: "/dashboard", icon: "fa-solid fa-house", label: "Dashboard" },
    { path: "/categories", icon: "fa-solid fa-border-all", label: "Categories" },
    { path: "/approval", icon: "fa-regular fa-circle-check", label: "Approval" },
    { path: "/shop", icon: "fa-solid fa-shop", label: "Shops" },
    { path: "/product", icon: "fa-solid fa-clipboard-list", label: "Products" },
    { path: "/admin", icon: "fa-solid fa-user-tie", label: "Admin" },
    { path: "/ads", icon: "fa-solid fa-arrow-trend-up", label: "Ads" },
    { path: "/profile", icon: "fa-solid fa-circle-user", label: "My Profile" },
    { path: "/view", icon: "fa-solid fa-chart-line", label: "Views" },
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
            className={`flex items-center w-full px-6 py-3 space-x-3 rounded-md ${
              pathname === item.path
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-purple-500 text-white"
            }`}
          >
            <i className={item.icon}></i>
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
