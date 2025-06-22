"use client"

import { Axios } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"




export default function SignUp(){
    const [user,setuser] = React.useState({
        email:"",
        password:"",
        username:"",

    })
    const onSignUp = async ()=>{}
    return(
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>sign up </h1>
            <hr />
            <label htmlFor="username">Username:</label>
            <input
             type="text"
             id="username"
                value={user.username}
                onChange={(e) => setuser({...user,username:e.target.value})}
                placeholder="Enter your username"
            />
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
            <button onClick={onSignUp}>Sign Up</button>
            link to <Link href="/login">Login</Link>
        </div>
    )
}