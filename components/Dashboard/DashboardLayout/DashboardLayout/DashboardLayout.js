// "use client";

// import { useRouter } from "next/navigation";
// import Loading from "@/components/Loading/Loading";
// import DashboardHeader from "../DashboardHeader/DashboardHeader";
// import Sidebar from "../SideBar/Sidebar";
// import { useEffect, useState } from "react";
// import { getAccessToken } from "@/services/auth.service";

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const [accessToken, setAccessToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);


//   useEffect(() => {
//     const token = getAccessToken();
//     setAccessToken(token);
//     if (!token) {
//       router.push("/");
//     }
//     setIsLoading(false);
//   }, [accessToken, router]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <DashboardHeader />
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 p-4 bg-gray-100">{children}</div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import Sidebar from "../SideBar/Sidebar";
import { getAccessToken } from "@/services/auth.service";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
    if (!token) {
      router.push("/");
    }
    setIsLoading(false);
  }, [accessToken, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div >
      <DashboardHeader toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />


        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
