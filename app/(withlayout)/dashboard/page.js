

"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusSquare,
  Boxes,
  ShoppingCart,
  CreditCard,
  UserPlus,
  Users,
  ShoppingBag,
} from "lucide-react"; // Lucide icons
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Updated Menu items with icons
const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Add User", path: "/dashboard/add-user", icon: <UserPlus /> },
  { name: "Add Product", path: "/dashboard/add-product", icon: <PlusSquare /> },
  { name: "Create Order", path: "/dashboard/create-order", icon: <ShoppingBag /> },
  { name: "All Users", path: "/dashboard/all-users", icon: <Users /> },
  { name: "All Product", path: "/dashboard/all-product", icon: <Boxes /> },
  { name: "All Order", path: "/dashboard/all-orders", icon: <ShoppingCart /> },
  { name: "Payment", path: "/dashboard/payment", icon: <CreditCard /> },
];



const Dashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 min-h-screen">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Welcome to Your Dashboard
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index} className="group">
            <Card className="transition-all duration-300 bg-white hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer">
              <CardHeader className="flex items-center space-x-4">
                {/* Icon with Lucide styling */}
                <div className="text-6xl text-indigo-600 group-hover:text-white">
                  {item.icon}
                </div>
                {/* Card Title */}
                <CardTitle className="text-2xl font-semibold group-hover:text-white">
                  {item.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

