'use client';

import Link from "next/link";
import { useAuth } from "@/app/login/auth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white bg-opacity-20 shadow-lg px-4 py-4 flex justify-between items-center font-bold">
      <div className="flex items-center">
        <Link href="/" className="hover:text-purple-600 mr-4 text-xl font-semibold cursor-pointer">
          Home
        </Link>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <button 
            onClick={() => logout()} 
            className="bg-purple-700 hover:bg-purple-900 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link 
            href="/login" 
            className="bg-purple-700 hover:bg-purple-900 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}