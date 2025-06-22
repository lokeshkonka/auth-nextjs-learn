"use client"

import { Axios } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"




export default function Login(){
    const [user,setuser] = React.useState({
        email:"",
        password:"",
       

    })
    const onLogin = async ()=>{}
    return(
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
           
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setuser({...user,email:e.target.value})}
                placeholder="Enter your email"
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setuser({...user,password:e.target.value})}
                placeholder="Enter your password"
            />
            <button onClick={onLogin}>Login</button>
            link to <Link href="/signup"> visit Sign Up</Link>
        </div>
    )
}