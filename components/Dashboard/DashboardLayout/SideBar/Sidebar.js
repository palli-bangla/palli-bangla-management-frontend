// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Add User", path: "/dashboard/add-user" },
//     { name: "Add Product", path: "/dashboard/add-product" },
//     { name: "Create Order", path: "/dashboard/create-order" },
//     { name: "All Users", path: "/dashboard/all-users" },
//     { name: "All Product", path: "/dashboard/all-product" },
//     { name: "All Order", path: "/dashboard/all-orders" },
//     { name: "Payment", path: "/dashboard/payment" },
//   ];

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
//       <h2 className="text-center text-2xl font-bold p-4">Sidebar</h2>
//       <ul className="flex flex-col space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link href={item.path}>
//               <span
//                 className={`block p-3 cursor-pointer hover:bg-gray-700 ${
//                   pathname === item.path ? "bg-gray-700" : ""
//                 }`}
//               >
//                 {item.name}
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add User", path: "/dashboard/add-user" },
    { name: "Add Product", path: "/dashboard/add-product" },
    { name: "Create Order", path: "/dashboard/create-order" },
    { name: "All Users", path: "/dashboard/all-users" },
    { name: "All Product", path: "/dashboard/all-product" },
    { name: "All Order", path: "/dashboard/all-orders" },
    { name: "Payment", path: "/dashboard/payment" },
  ];

  const handleMenuItemClick = () => {
    if (isSidebarOpen) {
      toggleSidebar(); // Close the sidebar
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform bg-gray-800 text-white w-64 z-40 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold mt-20 md:mt-0">Sidebar</h2>
          {/* Close Button for Small Screens */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} passHref>
                <span
                  onClick={handleMenuItemClick} // Close sidebar on menu item click
                  className={`block p-3 cursor-pointer hover:bg-gray-700 ${
                    pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
