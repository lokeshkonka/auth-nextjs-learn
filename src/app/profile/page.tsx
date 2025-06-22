"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

export default function Profile() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.post(
        "/api/users/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
