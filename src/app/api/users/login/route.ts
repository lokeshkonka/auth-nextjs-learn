import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📦 Incoming body:", body);

    const { email, password } = body;

    console.log("✅ Parsed fields:", { email, password });

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("👀 Found user:", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    // Create token data
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    
    // Return success response
   const response = NextResponse.json({ message: "Login successful", user, token }, { status: 200 });
   response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return response;
  } catch (error: any) {
    console.error("🔥 Error during login:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}