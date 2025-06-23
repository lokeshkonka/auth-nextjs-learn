import getDataFromToken from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import {connect} from '../../../../dbconfig/dbconfig';
connect();


export async function GET(request: NextRequest) {
  const userId = getDataFromToken(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
