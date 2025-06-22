import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";




connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📦 Incoming body:", body);

    const { username, email, password } = body;

    console.log("✅ Parsed fields:", { username, email, password });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("👀 Existing user:", existingUser);

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log("✅ User saved:", savedUser);

    return NextResponse.json({ message: "User created successfully", user: savedUser }, { status: 201 });

  } catch (error: any) {
    console.error("🔥 Error creating user:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}



