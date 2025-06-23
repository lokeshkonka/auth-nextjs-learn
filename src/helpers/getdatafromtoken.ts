import { NextRequest } from "next/server";

const getDataFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  if (!token) return null;

  try {
    
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET || "");
    if (!decodedtoken) return null;
    return decodedtoken.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export default getDataFromToken;







