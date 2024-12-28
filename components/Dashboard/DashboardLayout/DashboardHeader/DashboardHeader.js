// "use client";

// import { Bell, User } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import Palli_bangla_logo from '../../../../assets/logo/Palli Bangla Logo.png'
// import Image from "next/image";
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { removeFromLocalStorage } from "@/utils/local-storage";
// import { clearUserFromStorage, removeUserInfo } from "@/services/auth.service";
// import toast from "react-hot-toast";

// const DashboardHeader = () => {

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = () => {
//     removeFromLocalStorage();
//     removeUserInfo();
//     clearUserFromStorage()
//     toast.success("Logout Successfully")
//     router.push("/");

//   }





//   return (
//     <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
//       {/* Left Side: Logo and Company Name */}
//       <div className="flex items-center gap-3">
//         <Image width={500} height={500} src={Palli_bangla_logo} alt="Company Logo" className="h-8 w-8" />
//         <span className="text-xl font-semibold text-gray-800">Palli Bangla</span>
//       </div>

//       {/* Right Side: Notifications and Account */}
//       <div className="flex items-center gap-4">
//         {/* Notification Icon */}
//         <Button variant="ghost" size="icon" aria-label="Notifications">
//           <Bell className="h-5 w-5 text-gray-600" />
//         </Button>

//         {/* User Account Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Avatar className="cursor-pointer">
//               <AvatarImage src={Palli_bangla_logo} alt="User Avatar" />
//               <AvatarFallback>PB</AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;


"use client";

import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Palli_bangla_logo from "../../../../assets/logo/Palli Bangla Logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { clearUserFromStorage, removeUserInfo } from "@/services/auth.service";
import toast from "react-hot-toast";

const DashboardHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    removeFromLocalStorage();
    removeUserInfo();
    clearUserFromStorage();
    toast.success("Logout Successfully");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-md lg:px-6">
      {/* Left Side: Logo and Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </Button>
        {/* Company Logo */}
        <div className="flex items-center gap-2">
          <Image
            width={500}
            height={500}
            src={Palli_bangla_logo}
            alt="Company Logo"
            className="h-16 w-16 object-contain"
          />
          <span className="hidden text-2xl font-semibold text-gray-800 lg:block">
            Palli Bangla
          </span>
        </div>
      </div>

      {/* Right Side: Notifications and User Account */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>

        {/* User Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={Palli_bangla_logo} alt="User Avatar" />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;

