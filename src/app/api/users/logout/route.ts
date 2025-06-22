import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModels";

import { NextRequest, NextResponse } from "next/server";    

connect();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Clear the token cookie
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  } catch (error: any) {
    console.error("🔥 Error during logout:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}






