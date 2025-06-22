"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Disable button if any field is empty
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  useEffect(() => {
    // Redirect if already logged in (token exists)
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  const onLogin = async () => {
    try {
      setLoading(true);
      setMessage("");
      
      const response = await axios.post("/api/users/login", user);
      
      if (response.status === 200) {
        setMessage("Login successful!");
        router.push("/profile");
      } else {
        setMessage("Login failed. Please try again.");
      }

    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="backdrop-blur-md bg-black/30 border border-white/20 shadow-xl rounded-2xl px-10 py-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <hr className="border-white/20 mb-6" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full mb-6 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full ${
              buttonDisabled ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors text-white font-semibold py-2 rounded-lg shadow-md`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-red-400 text-sm">{message}</p>
        )}

        <p className="text-center mt-4 text-white/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 underline hover:text-blue-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
