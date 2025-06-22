"use client"

import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { set } from "mongoose";
import axios from "axios";
export default function SignUp() {
const router = useRouter();

const [user, setuser] = React.useState({
  email: "",
  password: "",
  username: "",
});

const [buttondisabled, setButtonDisabled] = React.useState(false);
React.useEffect(() => {
  const isUserDataValid = user.email && user.password && user.username;
  setButtonDisabled(!isUserDataValid);
}, [user]);
 const [loading, setLoading] = React.useState(false);
  const onSignUp = async () => {
   try {
    setLoading(true);
    setButtonDisabled(true);
    const response = await axios.post("http://localhost:3000/api/users/signup", user);

    console.log("Sign Up Response:", response.data);
    router.push("/login");
    toast.success("Sign Up Successful! Please login to continue.");
    
    
   } catch (error: any) {
     const errorMessage =
       error.response?.data?.message ||
       error.response?.data?.error ||
       error.message ||
       "An error occurred while signing up. Please try again.";
     toast.error(errorMessage);
     console.error("Sign Up Error:", error);
   } finally {
    setLoading(false);
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="backdrop-blur-md bg-black/30 border border-white/20 shadow-xl rounded-2xl px-10 py-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <hr className="border-white/20 mb-6" />
        <h1>{loading ? "Loading..." : "Sign Up"}</h1>
        <label htmlFor="username" className="block mb-1">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={onSignUp}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg shadow-md"
        >
         {buttondisabled ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-white/70">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 underline hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
